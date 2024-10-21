import React, { useEffect, useState, useCallback } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import batooty from '@batooty/core'
import Tus from '@batooty/tus'
import FilePicker  from '@batooty/react-native'
import  usebatooty  from '@batooty/react/lib/usebatooty'
import FileList from './FileList'
import PauseResumeButton from './PauseResumeButton'
import ProgressBar from './ProgressBar'
import SelectFiles from './SelectFilesButton'
import getTusFileReader from './tusFileReader'

export default function App () {
  const [state, _setState] = useState({
    progress: 0,
    total: 0,
    file: null,
    uploadURL: null,
    isFilePickerVisible: false,
    isPaused: false,
    uploadStarted: false,
    uploadComplete: false,
    info: null,
    totalProgress: 0,
  })

  const setState = useCallback((newState) => _setState((oldState) => ({ ...oldState, ...newState })), [])

  const batooty = usebatooty(() => {
    return new batooty({ autoProceed: true, debug: true })
      .use(Tus, {
        endpoint: 'https://tusd.tusdemo.net/files/',
        urlStorage: AsyncStorage,
        fileReader: getTusFileReader,
        chunkSize: 10 * 1024 * 1024, // keep the chunk size small to avoid memory exhaustion
      })
  })

  useEffect(() => {
    batooty.on('upload-progress', (file, progress) => {
      setState({
        progress: progress.bytesUploaded,
        total: progress.bytesTotal,
        totalProgress: batooty.state.totalProgress,
        uploadStarted: true,
      })
    })
    batooty.on('upload-success', () => {
      // console.log(file.name, response)
    })
    batooty.on('complete', (result) => {
      setState({
        status: result.successful[0] ? 'Upload complete ✅' : 'Upload errored ❌',
        uploadURL: result.successful[0] ? result.successful[0].uploadURL : null,
        uploadComplete: true,
        uploadStarted: false,
      })
      console.log('Upload complete:', result)
    })
    batooty.on('info-visible', () => {
      const { info } = batooty.getState()
      setState({
        info,
      })
      console.log('batooty-info:', info)
    })
    batooty.on('info-hidden', () => {
      setState({
        info: null,
      })
    })
  }, [setState, batooty])

  const showFilePicker = () => {
    setState({
      isFilePickerVisible: true,
      uploadStarted: false,
      uploadComplete: false,
    })
  }

  const hideFilePicker = () => {
    setState({
      isFilePickerVisible: false,
    })
  }

  const togglePauseResume = () => {
    if (state.isPaused) {
      batooty.resumeAll()
      setState({
        isPaused: false,
      })
    } else {
      batooty.pauseAll()
      setState({
        isPaused: true,
      })
    }
  }

  return (
    <View
      style={styles.root}
    >
      <Text
        style={styles.title}
      >
        batooty in React Native
      </Text>
      <View style={{ alignItems: 'center' }}>
        <Image
          style={styles.logo}
          // eslint-disable-next-line global-require
          source={require('./assets/batooty-logo.png')}
        />
      </View>
      <SelectFiles showFilePicker={showFilePicker} />

      {state.info ? (
        <Text
          style={{
            marginBottom: 10,
            marginTop: 10,
            color: '#b8006b',
          }}
        >
          {state.info.message}
        </Text>
      ) : null}

      <ProgressBar progress={state.totalProgress} />

      <PauseResumeButton
        isPaused={state.isPaused}
        onPress={togglePauseResume}
        uploadStarted={state.uploadStarted}
        uploadComplete={state.uploadComplete}
      />

      {batooty && (
        <FilePicker
          batooty={batooty}
          show={state.isFilePickerVisible}
          onRequestClose={hideFilePicker}
          companionUrl="http://localhost:3020"
        />
      )}

      {batooty && <FileList batooty={batooty} />}

      {state.status && <Text>Status: {state.status}</Text>}
      <Text>{state.progress} of {state.total}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 100,
    paddingBottom: 20,
    paddingLeft: 50,
    paddingRight: 50,
    flex: 1,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: { width: 80, height: 78, marginBottom: 50 },
})
