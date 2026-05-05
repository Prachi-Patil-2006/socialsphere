// Auth & User API mixin — exposes public endpoints for auth and user management
import Map "mo:core/Map";
import CommonTypes "../types/common";
import UserLib "../lib/user";

mixin (users : Map.Map<UserLib.UserId, UserLib.UserInternal>) {

  // Register the calling principal as a new user
  public shared ({ caller }) func registerUser(
    username : Text,
    bio : Text,
    profilePicture : Text,
  ) : async CommonTypes.Result<(), CommonTypes.ApiError> {
    UserLib.register(users, caller, username, bio, profilePicture);
  };

  // Get the calling principal's own profile
  public query ({ caller }) func getMyProfile() : async ?UserLib.User {
    UserLib.getProfile(users, caller);
  };

  // Get any user's profile by principal
  public query func getUserProfile(userId : CommonTypes.UserId) : async ?UserLib.User {
    UserLib.getProfile(users, userId);
  };

  // Get any user's profile by principal (alias for frontend compatibility)
  public query func getUser(userId : CommonTypes.UserId) : async ?UserLib.User {
    UserLib.getProfile(users, userId);
  };

  // Update the calling principal's profile
  public shared ({ caller }) func updateProfile(
    username : Text,
    bio : Text,
    profilePicture : Text,
  ) : async CommonTypes.Result<(), CommonTypes.ApiError> {
    UserLib.updateProfile(users, caller, username, bio, profilePicture);
  };

  // Follow another user
  public shared ({ caller }) func followUser(
    target : CommonTypes.UserId,
  ) : async CommonTypes.Result<(), CommonTypes.ApiError> {
    UserLib.followUser(users, caller, target);
  };

  // Unfollow another user
  public shared ({ caller }) func unfollowUser(
    target : CommonTypes.UserId,
  ) : async CommonTypes.Result<(), CommonTypes.ApiError> {
    UserLib.unfollowUser(users, caller, target);
  };

  // Get follower list for a user
  public query func getFollowers(userId : CommonTypes.UserId) : async [UserLib.User] {
    UserLib.getFollowers(users, userId);
  };

  // Get following list for a user
  public query func getFollowing(userId : CommonTypes.UserId) : async [UserLib.User] {
    UserLib.getFollowing(users, userId);
  };

  // Get all registered users (for explore/search)
  public query func getAllUsers() : async [UserLib.User] {
    UserLib.getAllUsers(users);
  };

};
