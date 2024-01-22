export default function Presentazione() {
    return (
        <video autoplay="autoplay" loop="loop" muted="muted" playsinline="playsinline" style={{width:'80vw', height:'auto', position:'absolute', bottom:0, right:0, left:'auto', top:'auto', zIndex:100}}>
            <source src="https://rotato.netlify.app/alpha-demo-site/movie-hevc.mov" type="video/mp4; codecs=&quot;hvc1&quot;" />
            <source src="https://rotato.netlify.app/alpha-demo-site/movie-webm.webm" type="video/webm" />
        </video>
    );
}