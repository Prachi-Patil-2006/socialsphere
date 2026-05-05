// User domain library — stateless functions operating on injected state
import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import CommonTypes "../types/common";
import Runtime "mo:core/Runtime";

module {
  public type UserId = CommonTypes.UserId;
  public type Timestamp = CommonTypes.Timestamp;
  public type ApiError = CommonTypes.ApiError;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  // Internal user record with mutable fields and proper Set types
  public type UserInternal = {
    id : UserId;
    var username : Text;
    var bio : Text;
    var profilePicture : Text;
    followers : Set.Set<UserId>;
    following : Set.Set<UserId>;
    createdAt : Timestamp;
  };

  // Shared (serializable) user record
  public type User = {
    id : UserId;
    username : Text;
    bio : Text;
    profilePicture : Text;
    followers : [UserId];
    following : [UserId];
    createdAt : Timestamp;
  };

  // Convert internal → public
  public func toPublic(u : UserInternal) : User {
    {
      id = u.id;
      username = u.username;
      bio = u.bio;
      profilePicture = u.profilePicture;
      followers = u.followers.toArray();
      following = u.following.toArray();
      createdAt = u.createdAt;
    };
  };

  // Create a new user record
  public func new(id : UserId, username : Text, bio : Text, profilePicture : Text) : UserInternal {
    {
      id;
      var username;
      var bio;
      var profilePicture;
      followers = Set.empty<UserId>();
      following = Set.empty<UserId>();
      createdAt = Time.now();
    };
  };

  // Validate username: 3-30 chars, not empty
  public func validateRegistration(username : Text) : Result<(), ApiError> {
    let len = username.size();
    if (len < 3 or len > 30) {
      #err(#invalidInput("Username must be between 3 and 30 characters"));
    } else {
      #ok(());
    };
  };

  // Register a new user; returns error if already registered
  public func register(
    users : Map.Map<UserId, UserInternal>,
    caller : UserId,
    username : Text,
    bio : Text,
    profilePicture : Text,
  ) : Result<(), ApiError> {
    switch (validateRegistration(username)) {
      case (#err(e)) { return #err(e) };
      case (#ok(())) {};
    };
    if (users.containsKey(caller)) {
      return #err(#alreadyExists);
    };
    let user = new(caller, username, bio, profilePicture);
    users.add(caller, user);
    #ok(());
  };

  // Get profile by principal
  public func getProfile(users : Map.Map<UserId, UserInternal>, userId : UserId) : ?User {
    switch (users.get(userId)) {
      case (?u) { ?toPublic(u) };
      case null { null };
    };
  };

  // Update mutable profile fields (caller must be registered)
  public func updateProfile(
    users : Map.Map<UserId, UserInternal>,
    caller : UserId,
    username : Text,
    bio : Text,
    profilePicture : Text,
  ) : Result<(), ApiError> {
    switch (validateRegistration(username)) {
      case (#err(e)) { return #err(e) };
      case (#ok(())) {};
    };
    switch (users.get(caller)) {
      case null { #err(#notFound) };
      case (?u) {
        u.username := username;
        u.bio := bio;
        u.profilePicture := profilePicture;
        #ok(());
      };
    };
  };

  // Follow another user; enforces no self-follow and no duplicates
  public func followUser(
    users : Map.Map<UserId, UserInternal>,
    caller : UserId,
    target : UserId,
  ) : Result<(), ApiError> {
    if (Principal.equal(caller, target)) {
      return #err(#selfAction);
    };
    switch (users.get(caller), users.get(target)) {
      case (?callerUser, ?targetUser) {
        if (callerUser.following.contains(target)) {
          return #err(#alreadyExists);
        };
        callerUser.following.add(target);
        targetUser.followers.add(caller);
        #ok(());
      };
      case _ { #err(#notFound) };
    };
  };

  // Unfollow a user
  public func unfollowUser(
    users : Map.Map<UserId, UserInternal>,
    caller : UserId,
    target : UserId,
  ) : Result<(), ApiError> {
    if (Principal.equal(caller, target)) {
      return #err(#selfAction);
    };
    switch (users.get(caller), users.get(target)) {
      case (?callerUser, ?targetUser) {
        callerUser.following.remove(target);
        targetUser.followers.remove(caller);
        #ok(());
      };
      case _ { #err(#notFound) };
    };
  };

  // Get followers list for a user
  public func getFollowers(users : Map.Map<UserId, UserInternal>, userId : UserId) : [User] {
    switch (users.get(userId)) {
      case null { [] };
      case (?u) {
        let followerIds = u.followers.toArray();
        followerIds.filterMap<UserId, User>(func(fid) {
          switch (users.get(fid)) {
            case (?fu) { ?toPublic(fu) };
            case null { null };
          };
        });
      };
    };
  };

  // Get following list for a user
  public func getFollowing(users : Map.Map<UserId, UserInternal>, userId : UserId) : [User] {
    switch (users.get(userId)) {
      case null { [] };
      case (?u) {
        let followingIds = u.following.toArray();
        followingIds.filterMap<UserId, User>(func(fid) {
          switch (users.get(fid)) {
            case (?fu) { ?toPublic(fu) };
            case null { null };
          };
        });
      };
    };
  };

  // Return the set of principals this user is following (for feed computation)
  public func getFollowingSet(users : Map.Map<UserId, UserInternal>, userId : UserId) : Set.Set<UserId> {
    switch (users.get(userId)) {
      case null { Set.empty<UserId>() };
      case (?u) { u.following };
    };
  };

  // Get all users as public records
  public func getAllUsers(users : Map.Map<UserId, UserInternal>) : [User] {
    let all = List.empty<User>();
    users.forEach(func(_, u) { all.add(toPublic(u)) });
    all.toArray();
  };
};
