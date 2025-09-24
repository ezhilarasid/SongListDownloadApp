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
import { useSelector, useDispatch } from "react-redux";
import { loadSongs, downloadSongThunk } from "../store/slice/songsSlice";

const SongListScreen = ({ navigation }) => {

    const dispatch = useDispatch();
      
    const { list: songs, loading, downloadingId } = useSelector((state) => state.songs);

    useEffect(() => {
        dispatch(loadSongs());
    }, [dispatch]);

    const handleDownload = async (item) => {
        const resultAction = await dispatch(downloadSongThunk(item));
        if (downloadSongThunk.fulfilled.match(resultAction)) {
        Alert.alert("✅ Download Complete", `${item.title} saved successfully!`);
        } else {
        Alert.alert("❌ Download Failed", "Something went wrong while downloading.");
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
