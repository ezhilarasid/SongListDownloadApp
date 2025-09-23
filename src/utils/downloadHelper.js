import RNFS from "react-native-fs";

export const downloadSong = async (song) => {
  try {
    const destPath = `${RNFS.DownloadDirectoryPath}/${song.title}.mp3`;

    const result = RNFS.downloadFile({
      fromUrl: song.url,
      toFile: destPath,
    });

    const res = await result.promise;

    if (res.statusCode === 200) {
      return destPath;
    } else {
      throw new Error("File not downloaded. Status: " + res.statusCode);
    }
  } catch (error) {
    throw error;
  }
};
