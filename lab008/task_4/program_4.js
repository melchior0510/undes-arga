//original code
function getUserDataOld(userId) {
  return new Promise((resolve, reject) => {
    let userInfo, userPosts, userComments;

    getUserInfo(userId)
      .then((info) => {
        userInfo = info;
        return getUserPosts(userId);
      })
      .then((posts) => {
        userPosts = posts;
        return getUserComments(userId);
      })
      .then((comments) => {
        userComments = comments;
        const userData = {
          info: userInfo,
          posts: userPosts,
          comments: userComments
        };
        resolve(userData);
      })
      .catch((error) => reject(error));
  });
}

async function getUserInfo(userId) {
  return new Promise((resolve, reject) => {
    if (userId == 123) {
      resolve(mockUserInfo);
    }
    else {
      reject("Unknown user id")
    }
  });
}

async function getUserPosts(userId) {
  return new Promise((resolve) => {
    resolve(mockUserPosts);
  });
}

async function getUserComments(userId) {
  return new Promise((resolve) => {
    resolve(mockUserComments);
  });
}

//TODO
// implementation with async/await (TO BE ADDED BY THE STUDENT)
async function getUserData(userId) {
  try {
    const userInfo = await getUserInfo(userId);
    const userPosts = await getUserPosts(userId);
    const userComments = await getUserComments(userId);

    return {
      info: userInfo,
      posts: userPosts,
      comments: userComments,
    };
  } catch (error) {
    throw error;
  }
}


// Test case 1: Successful retrieval of user data
let mockUserId = 123;
const mockUserInfo = { id: 123, name: "John Doe" };
const mockUserPosts = [{ id: 1, title: "Post 1" }, { id: 2, title: "Post 2" }];
const mockUserComments = [
  { id: 1, postId: 1, body: "Comment 1" },
  { id: 2, postId: 1, body: "Comment 2" },
  { id: 3, postId: 2, body: "Comment 3" }
];
const expectedUserData = {
  info: mockUserInfo,
  posts: mockUserPosts,
  comments: mockUserComments
};

async function runTestCase() {
  try {
    const result = await getUserData(mockUserId);

    if (JSON.stringify(result) === JSON.stringify(expectedUserData)) {
      console.log("Test case 1 passed: Successful retrieval of user data");
    } else {
      console.error("Test case 1 failed: Unexpected result");
    }
  } catch (error) {
    console.error("Test case 1 failed with an error:", error);
  }
}

runTestCase();
/*Expected output
Test case 1 passed: Successful retrieval of user data
*/



// Test case 2: Error
mockUserId = 122;
runTestCase();
/*Expected output
Test case 1 failed with an error: Unknown user id
*/

