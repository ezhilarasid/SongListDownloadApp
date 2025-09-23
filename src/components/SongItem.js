import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

const SongItem = ({ song, onPress, onDownload, downloading }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={require("../assets/whiteMusicIcon.png")} style={styles.thumbnail} />
      <View style={styles.details}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
      </View>
      <TouchableOpacity style={styles.downloadBtn} onPress={onDownload} disabled={downloading}>
        {downloading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Image
            source={require("../assets/whiteDownload.png")}
            style={{ width: 24, height: 24 }}
          />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", padding: 10 },
  thumbnail: { width: 50, height: 50, borderRadius: 6, backgroundColor: "#rgba(0,0,0,0.1)" },
  details: { flex: 1, marginLeft: 10, color: "white" },
  title: { fontSize: 18, fontWeight: "bold", color: "white" },
  artist: { fontSize: 16, color: "gray" },
  downloadBtn: { padding: 10 },
  downloadText: { fontSize: 18 },
});

export default SongItem;
