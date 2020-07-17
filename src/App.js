import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import filesvg from "./download.png";
import NavBar from "./components/NavBar";
import ButtonBar from "./components/ButtonBar";
import fileDownload from "js-file-download";
import { ListContainer, ListItem } from "./styles";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      encryptedfiles: [],
      selectedFile: "",
    };
    this.listEncryptedFiles = this.listEncryptedFiles.bind(this);
    this.downloadtextfile = this.downloadtextfile.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  listEncryptedFiles() {
    axios.get("http://localhost:5000/listencryptedfiles").then((resp) => {
      if (resp.data) {
        this.setState({ encryptedfiles: resp.data.files });
      }
    });
  }

  downloadtextfile() {
    console.log("Downloaded file: ", this.state.selectedFile);
    axios
      .get(`http://localhost:5000/downloadfile?file=${this.state.selectedFile}`)
      .then((resp) => {
        console.log(resp);
        const fileName = this.state.selectedFile.split("/").pop();
        fileDownload(resp.data, fileName);
      });
  }

  handleClick(file) {
    let previousElement = document.getElementById(this.state.selectedFile);
    if (previousElement !== null) {
      previousElement.classList.remove("active_item");
    }
    // eslint-disable-next-line no-unused-expressions
    this.state.selectedFile;
    this.setState({
      selectedFile: file,
    });
    let currentClass = document.getElementById(file);
    currentClass.classList.add("active_item");
    console.log(currentClass);
  }

  renderFiles() {
    const files = this.state.encryptedfiles;
    return files.map((file) => {
      const fileName = file.split("/").pop();
      return (
        <ListItem>
          <div
            key={file}
            className="individual-item"
            onClick={() => this.handleClick(file)}
            id={file}
          >
            <img src={filesvg} alt="file" />
            {fileName}
          </div>
        </ListItem>
      );
    });
  }

  render() {
    console.log(this.state.encryptedfiles);
    return (
      <div className="App">
        <NavBar />
        <div>
          <ButtonBar
            downloadfile={this.downloadtextfile}
            getEncryptedFiles={this.listEncryptedFiles}
          />
        </div>
        {this.state.encryptedfiles.length ? (
          <>
            <h3>Encrypted List</h3>
            <ListContainer>{this.renderFiles()}</ListContainer>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default App;
