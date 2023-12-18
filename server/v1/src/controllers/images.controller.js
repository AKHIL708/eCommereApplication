const router = require("express").Router();
const fireBaseApp = require("../utils/fireBaseConfig");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getMetadata,
  listAll,
} = require("firebase/storage");
const pool = require("../../../../db");
const multer = require("multer");

const storage = getStorage(fireBaseApp);

// Multer Configuration
const storageMulter = multer.memoryStorage();
const upload = multer({ storage: storageMulter });

router.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const { downloadURL, contentType } = await uploadToFirebase(req.file);
    const mysqlLink = await storeLinkInMySQL(downloadURL);

    // NOTE the downloadURL is the URL we are going to store.

    // Set headers for inline display for showing in frontend .
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", "inline; filename=image.jpg");
    const data = req.body;
    // Send the image URL in the response
    res.status(200).json({ downloadURL, mysqlLink, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/getAllImages", async (req, res) => {
  try {
    // const images = await getImagesFromFirebaseStorage();
    // res.status(200).json({ images });
    console.log(req.body);
    const data = req.body;
    res.status(200).send({
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const uploadToFirebase = async (file) => {
  const storageRef = ref(storage, `images/${file.originalname}`);
  await uploadBytes(storageRef, file.buffer);
  const downloadURL = await getDownloadURL(storageRef);

  // Optionally, set headers for inline display
  const metadata = await getMetadata(storageRef);
  const contentType = metadata.contentType;

  return {
    downloadURL,
    contentType,
  };
};

const storeLinkInMySQL = async (firebaseURL) => {
  try {
    const sql = `INSERT INTO images (url) VALUES ("${firebaseURL}")`;
    let [result] = await pool.promise().query(sql);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getImagesFromFirebaseStorage = async () => {
  try {
    const listRef = ref(storage, "images/");
    const listResult = await listAll(listRef);

    // Get URLs for all images
    const imageUrls = await Promise.all(
      listResult.items.map(async (item) => {
        const downloadURL = await getDownloadURL(item);
        return downloadURL;
      })
    );

    return imageUrls;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getImagesFromMySQL = async () => {
  const [rows] = await pool.execute("SELECT * FROM images");
  return rows.map((row) => row.url);
};

module.exports = router;
