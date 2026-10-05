//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading=document.getElementById("loading");
const errorDiv=document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(imgObj){
	return new Promise((resolve,reject)=>{
		const img=new Image();
		img.src=imgObj.url;
		img.onload=()=>resolve(img);
		img.onerror=()=>reject(new Error(`Failed to load image url:${imgObj.url}`));
	});
}

function downloadImages(){
	loading.classList.remove("hidden");
	errorDiv.innerText="";
	output.innerHTML="";
	const promises=images.map((image)=>downloadImage(image));
	Promise.all(promises).then((downloadedImages)=>{
		loading.classList.add("hidden");
		downloadedImages.forEach((img)=>{
			output.appendChild(img);
		});
	})
	.catch((err)=>{
		loading.classList.add("hidden");
		errorDiv.innerText=err.message||"Failed to download images.";
	});
}
btn.addEventListener("click",downloadImages);