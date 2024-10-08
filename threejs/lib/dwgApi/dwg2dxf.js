
importScripts(["./DwgApi.js"])

self.onmessage = function(event) {
    if(DwgApi.dwg2dxf){
        dwg2dxf(event.data)
    }
    else{
        DwgApi.onRuntimeInitialized =  () =>{
            dwg2dxf(event.data)
        } 
    }
    
};

function dwg2dxf(url){
    console.log(url)
    fetch(url).then((response) => {
        return response.arrayBuffer();
    }).then((buffer) => {
        DwgApi.createDataFile("./test.dwg",buffer);
        let dxfData= DwgApi.dwg2dxf("./test.dwg");
        DwgApi.deleteFile("./test.dwg");
        const blob=new Blob([dxfData], {type: 'text/plain'})
        const url = URL.createObjectURL(blob);
        self.postMessage({status:0,url:url})
    }).catch((error) => {
        self.postMessage({status:1})
    });
}
