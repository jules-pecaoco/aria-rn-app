import { Client, Account, ID, Avatars, Databases, Query, Storage } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jules.aria",
  projectID: "66718d140038bec5a72b",
  databaseID: "66718e42002825dd9f99",
  userCollectionID: "66718e650004edda46cf",
  videoCollectionID: "66718e940020bf5d2d91",
  storageID: "66719071002925788bbf",
};

const { endpoint, platform, projectID, databaseID, userCollectionID, videoCollectionID, storageID } = config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectID) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email: string, username: string, password: string) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw Error;

    const avatarURL = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await database.createDocument(config.databaseID, config.userCollectionID, ID.unique(), {
      accountID: newAccount.$id,
      email,
      username,
      avatar: avatarURL,
    });

    return newUser;
  } catch (error: any) {
    throw new Error("User Creation:" + error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error("Sign In:" + error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(config.databaseID, config.userCollectionID, [Query.equal("accountID", currentAccount.$id)]);

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async () => {
  try {
    const post = await database.listDocuments(databaseID, videoCollectionID);

    return post.documents;
  } catch (error) {
    throw new Error("Getting Post:" + error);
  }
};

export const getLatestPost = async () => {
  try {
    const post = await database.listDocuments(databaseID, videoCollectionID, [Query.orderDesc("$createdAt"), Query.limit(7)]);

    return post.documents;
  } catch (error) {
    throw new Error("Getting Post:" + error);
  }
};

export const searchPost = async (query: any) => {
  try {
    const post = await database.listDocuments(databaseID, videoCollectionID, [Query.search("title", query)]);

    return post.documents;
  } catch (error) {
    throw new Error("Getting Post:" + error);
  }
};

export const getUserPost = async (userId: any) => {
  try {
    const post = await database.listDocuments(databaseID, videoCollectionID, [Query.equal("users", userId)]);

    return post.documents;
  } catch (error) {
    throw new Error("Getting Post:" + error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error: any) {
    throw new Error("Sign Out " + error.message);
  }
};

export const getFilePreview = async (fileId: string, type: any) =>  {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageID, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(storageID, fileId, 2000, 2000, undefined, 100);
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) {
      throw new Error();
    }

    return fileUrl;
  } catch (error: any) {
    throw new Error("File Preview " + error);
  }
}

export const uploadFile = async (file: any, type: string) => {
  if (!file) return;

  const asset = { 
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
   };

  try {
    const uploadedFile = await storage.createFile(storageID, ID.unique(), asset);

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error: any) {
    throw new Error("Invalid FileURL " + error);
  }
};

export const createVideo = async (form:any) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"), 
      uploadFile(form.video, "video")
    ]);

    console.log("USER ID " + form.userId)

    const newPost = await database.createDocument(
      databaseID,
      videoCollectionID,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        users: form.userId.$id
      }
    )
    
    return newPost;
  } catch (error: any) {
    throw new Error("Creating Video " + error);
  }
};
