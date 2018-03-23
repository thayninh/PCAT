import React, { Component } from 'react';
import axios from 'axios';

class Upload extends Component{
    constructor(props) {
        super(props);
        this.state = {selectedFile: null};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        this.setState({selectedFile: event.target.files[0]}, () => {
            const fd = new FormData();
            fd.append('point cloud', this.state.selectedFile, this.state.selectedFile.name);
            axios.post('http://localhost:4000/upload', fd).then(res => {
                if(res.data.status === 'ok'){
                    //To avoid being not used of libraries from html file, using window.xxx
                    window.viewer = new window.Potree.Viewer(document.getElementById("potree_render_area"));
                    window.viewer.setEDLEnabled(true);
                    window.viewer.setFOV(60);
                    window.viewer.setPointBudget(1*1000*1000);
                    document.title = "";
                    window.viewer.setEDLEnabled(false);
                    window.viewer.setBackground("gradient"); // ["skybox", "gradient", "black", "white"];
                    window.viewer.setDescription(``);
                    window.viewer.loadSettingsFromURL();
                    window.viewer.loadGUI(() => {
                        window.viewer.setLanguage('en');
                        window.$("#menu_tools").next().show();
                        //viewer.toggleSidebar();
                    });
                    window.Potree.loadPointCloud("./uploaded_data/cloud.js", "index", e => {
                        let pointcloud = e.pointcloud;
                        let material = pointcloud.material;
                        window.viewer.scene.addPointCloud(pointcloud);
                        material.pointColorType = window.Potree.PointColorType.RGB; // any Potree.PointColorType.XXXX 
                        material.size = 1;
                        material.pointSizeType = window.Potree.PointSizeType.ADAPTIVE;
                        material.shape = window.Potree.PointShape.SQUARE;
                        window.viewer.fitToScreen();
                    }); //
                    alert("Uploaded Successfully");	
                }else{
                    alert('Uploaded fail');
                }
            })
        });  
    }

    render(){
        return(
            <div>
                <input onChange={this.handleChange} type="file"></input>
            </div>
        );
    }
}
export default Upload;