const FIREBASE_DOMAIN =
  "https://great-picture-dc893-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function register(userData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/users.json`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not register.");
  }
  return null;
}

export async function login(userEmail) {
  const response = await fetch(`${FIREBASE_DOMAIN}/users.json`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch user.");
  }
  for (const key in data) {
    if (data[key].email === userEmail) {
      return key;
    }
  }
  return null;
}

export async function getUserData(userId){
  const response = await fetch(`${FIREBASE_DOMAIN}/users/${userId}.json`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch user.");
  }
  const loadedUserData = {
    id: userId,
    ...data
  }
  return loadedUserData;
}

export async function addPicture(pictureData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/pictures.json`, {
    method: "POST",
    body: JSON.stringify(pictureData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not create picture.");
  }
  return null;
}

export async function getAllPictures() {
  const response = await fetch(`${FIREBASE_DOMAIN}/pictures.json`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch pictures.");
  }
  const transformedPictures = [];
  for (const key in data) {
    const pictureObj = {
      id: key,
      ...data[key],
    };
    transformedPictures.unshift(pictureObj);
  }
  return transformedPictures;
}

export async function getUserPictures(userId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/pictures.json`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch pictures.");
  }
  const transformedPictures = [];
  for (const key in data) {
    if (data[key].owner === userId) {
      const pictureObj = {
        id: key,
        ...data[key],
      };
      transformedPictures.unshift(pictureObj);
    }
  }
  return transformedPictures;
}
export async function getSinglePicture(pictureId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/pictures/${pictureId}.json`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch picture.");
  }
  const loadedPicture = {
    id: pictureId,
    ...data,
  };
  return loadedPicture;
}

export async function addComment(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${requestData.pictureId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.content),
      header: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }
  return {
    commentId: data.name,
  };
}

export async function getAllComments(pictureId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${pictureId}.json`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not get comments.");
  }
  const transformedComments = [];
  for (const key in data) {
    const commentObj = {
      id: key,
      text: data[key].commentData,
      commenter: data[key].commenter
    };
    transformedComments.push(commentObj);
  }
  return transformedComments;
}
