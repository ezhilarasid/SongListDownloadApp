import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    ImageBackground,
    Alert
} from "react-native";
import { fetchSongs } from "../api/songsApi";
import SongItem from "../components/SongItem";
import { downloadSong } from "../utils/downloadHelper";

const SongListScreen = ({ navigation }) => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSongs();
    }, []);

    const loadSongs = async () => {
        const data = await fetchSongs();
        setSongs(data);
        setLoading(false);
    };

    const [downloading, setDownloading] = useState(false);
    const [downloadingId, setDownloadingId] = useState(null);

    const handleDownload = async (item) => {
        try {
            setDownloadingId(item.id); 
            const path = await downloadSong(item);
            Alert.alert("✅ Download Complete", `${item.title} saved to:\n${path}`);
        } catch (err) {
            console.error("Download failed", err);
            Alert.alert("❌ Download Failed", "Something went wrong while downloading.");
        } finally {
            setDownloadingId(null); 
        }
    };

    if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

    return (
        <ImageBackground
            source={require("../assets/greenGradientBg.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <FlatList
                    data={songs}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <SongItem
                            song={item}
                            onPress={() => navigation.navigate("Details", { song: item })}
                            onDownload={() => handleDownload(item)}
                            downloading={downloadingId === item.id}
                        />
                    )}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)", // dark overlay so text is readable
        paddingTop: 40
    },
});

export default SongListScreen;
