const jwt = require('jsonwebtoken');
const User = require('../models/userSchema.js');
const FriendRequest = require('../models/friendRequestSchema');
const { authenticateUser } = require('../middlewares/authMiddleware')


class FriendController {

  getUsersList = async (req, res) => {
    const { userId } = req;
    try {
      const users = await User.find({ _id: { $ne: userId } }).select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  };

  // Send Friend Request
  sendFriendRequest = async (req, res) => {
    const { userIde } = req.params;
    const { userId } = req;
    try {
      console.log(userIde)
      console.log(userId);
      const receiver = await User.findById(userId);
      console.log(receiver)



      if (!receiver) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if a friend request already exists
      console.log('hi');
      const existingRequest = await FriendRequest.findOne({
        fromUser: userId,
        toUser: userIde,
      });

      if (existingRequest) {
        return res.status(400).json({ error: 'Friend request already sent' });
      }

      // Create a new friend request
      const newRequest = new FriendRequest({
        fromUser: userId,
        toUser: userIde,
      });

      await newRequest.save();
      res.json({ message: 'Friend request sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  };

  // Accept/Reject Friend Request
  respondToFriendRequest = async (req, res) => {
    const { requestId } = req.params;
    const { action } = req.body; // 'accept' or 'reject'
    const { userId } = req;

    try {
      const friendRequest = await FriendRequest.findOne({ _id: requestId });

      if (!friendRequest) {
        return res.status(404).json({ error: 'Friend request not found' });
      }
      if (friendRequest.toUser.toString() !== userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (action === 'accept') {
        // Update friend lists for both users

        await User.findByIdAndUpdate(userId, {
          $addToSet: { friends: friendRequest.fromUser },
        });
        await User.findByIdAndUpdate(friendRequest.fromUser, {
          $addToSet: { friends: userId },
        });
      }
      console.log("hi")
      await FriendRequest.deleteOne({ _id: requestId })

      // Remove the friend request
      res.json({ message: 'Friend request handled successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  };

  // List Current User's Friend List
  listFriends = async (req, res) => {
    const { userId } = req;
    try {
      const user = await User.findById(userId).populate('friends', '-password');
      res.json(user.friends);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  };


}

module.exports = new FriendController();

