import React from 'react';
import './App.css';

class App extends React.Component{
  state = {
    imageUrl: null,
    imageAlt: null,
  }
    handleImageUpload = () => {
        const { files } = document.querySelector('input[type="file"]')
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', 'qpxvb4io');
        const options = {
            method: 'POST',
            body: formData,
        };
        return fetch('https://api.Cloudinary.com/v1_1/dyiqryxfl/image/upload', options)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    imageUrl: res.secure_url,
                    imageAlt: `An image of ${res.original_filename}`
                })
            })
            .catch(err => console.log(err));
    }
    openWidget = () => {
        // create the widget
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'dyiqryxfl',
                uploadPreset: 'qpxvb4io',
            },
            (error, result) => {
                if (result.event === 'success') {
                    this.setState({
                        imageUrl: result.info.secure_url,
                        imageAlt: `An image of ${result.info.original_filename}`
                    })
                }
            },
        );
        widget.open(); // open up the widget after creation
    };

//...
  render() {
    const { imageUrl, imageAlt } = this.state;
    return (
        <main className="App">
          <section className="left-side">
            <form>
              <div className="form-group">
                <input type="file"/>
              </div>
              <button type="button" className="btn" onClick={this.handleImageUpload}>Submit</button>
              <button type="button" className="btn widget-btn" onClick={this.openWidget}>Upload Via Widget</button>
            </form>
          </section>
          <section className="right-side">
            <p>The resulting image will be displayed here</p>
            {imageUrl && (
                <img src={imageUrl} alt={imageAlt} className="displayed-image"/>
            )}
          </section>
        </main>
    );
  }
}

export default App;