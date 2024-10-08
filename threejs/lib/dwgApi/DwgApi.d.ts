
declare namespace DwgApi
{
    function createDataFile(fileName:string, data: ArrayBufferView | string): void;
	function dwg2dxf(fileName:string): string;
	function deleteFile(fileName:string): void;
}