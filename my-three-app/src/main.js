import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 10); // Start closer for zoom-out
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0);
scene.background = null;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.enablePan = false;
controls.enableRotate = false;
controls.update();

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let bird, mixer;
let modelGroup = new THREE.Group();
scene.add(modelGroup);

const clock = new THREE.Clock();
let isRotating = true;
const targetRotationY = -Math.PI / 6;

const iconSprites = [];
const tooltip = document.createElement('div');
tooltip.style.position = 'fixed';
tooltip.style.color = 'white';
tooltip.style.padding = '5px 10px';
tooltip.style.background = 'rgba(0, 0, 0, 0.7)';
tooltip.style.borderRadius = '500px';
tooltip.style.display = 'none';
tooltip.style.pointerEvents = 'none';
tooltip.style.zIndex = '10000';
document.body.appendChild(tooltip);

const loader = new GLTFLoader();
loader.load('./main scene.glb', (gltf) => {
  bird = gltf.scene;
  bird.position.y = -50; // Start offscreen (fly-in effect)
  modelGroup.add(bird);

  if (gltf.animations && gltf.animations.length > 0) {
    mixer = new THREE.AnimationMixer(bird);
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });
  }

  // Animate bird flying in
  let flyProgress = 0;
  function flyIn() {
    flyProgress += 0.01;
    bird.position.y = THREE.MathUtils.lerp(-50, 0, flyProgress);
    if (flyProgress < 1) {
      requestAnimationFrame(flyIn);
    }
  }
  flyIn();

  addCaveIcons();
}, undefined, (error) => {
  console.error("Failed to load GLB:", error);
});

function addCaveIcons() {
  const iconData = [
    { x: 25, y: 19, z: 35, link: 'http://44.211.165.224:3000/', texture: '/icons/cave.png', title: '𐂃 Ancient Scroll' },
    { x: 45, y: 19, z: 8, link: 'http://3.235.126.25/', texture: '/icons/cave.png', title: '🔥 Quest For Campus Embers 🔥' },
    { x: 75, y: 12, z: 30, link: 'http://3.149.228.61:3000/', texture: '/icons/cave.png', title: '𓂀 Dino Law 𓃰' },
  ];

  const texLoader = new THREE.TextureLoader();
  iconData.forEach(({ x, y, z, link, texture, title }) => {
    texLoader.load(texture, (tex) => {
      const material = new THREE.SpriteMaterial({ map: tex });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(25, 25, 20);
      sprite.position.set(x, y + 5, z);
      sprite.userData.link = link;
      sprite.userData.title = title;
      modelGroup.add(sprite);
      iconSprites.push(sprite);
    });
  });
}

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(iconSprites);

  if (intersects.length > 0) {
    const intersected = intersects[0].object;
    tooltip.innerHTML = intersected.userData.title;
    tooltip.style.left = `${event.clientX + 10}px`;
    tooltip.style.top = `${event.clientY + 10}px`;
    tooltip.style.display = 'block';
  } else {
    tooltip.style.display = 'none';
  }
});

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(iconSprites);

  for (let obj of intersects) {
    if (obj.object.userData.link) {
      const targetLink = obj.object.userData.link;

      const title = obj.object.userData.title || '';
      let gifSrc = '/icons/fall.gif';
      
      if (title.includes('Ancient Scroll')) gifSrc = '/icons/scroll.gif';
      else if (title.includes('Quest For Campus Embers')) gifSrc = '/icons/game.gif';
      else if (title.includes('Dino')) gifSrc = '/icons/dinolaw.gif';
      
      controls.enabled = false;
      const zoomTarget = obj.object.position.clone().add(new THREE.Vector3(0, 5, 10));
      let t = 0;

      function zoomIn() {
        t += 0.09;
        camera.position.lerp(zoomTarget, t);
        camera.lookAt(obj.object.position);

        if (t < 1) {
          requestAnimationFrame(zoomIn);
        } else {
          const overlay = document.createElement('div');
          overlay.style.position = 'fixed';
          overlay.style.top = 0;
          overlay.style.left = 0;
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
          overlay.style.display = 'flex';
          overlay.style.alignItems = 'center';
          overlay.style.justifyContent = 'center';
          overlay.style.zIndex = 9999;
          overlay.style.opacity = '0';
          overlay.style.transition = 'opacity 1s';

          const gif = document.createElement('img');
          gif.src = gifSrc;
          gif.alt = 'Torch Loading';
          gif.style.position = 'absolute';
          gif.style.top = '0';
          gif.style.left = '0';
          gif.style.width = '100%';
          gif.style.height = '100%';
          gif.style.objectFit = 'cover';

          overlay.appendChild(gif);
          document.body.appendChild(overlay);

          requestAnimationFrame(() => {
            overlay.style.opacity = '1';
          });

          setTimeout(() => {
            overlay.style.opacity = '0';
          
            // Create a dark overlay
            const darkOverlay = document.createElement('div');
            darkOverlay.style.position = 'fixed';
            darkOverlay.style.top = 0;
            darkOverlay.style.left = 0;
            darkOverlay.style.width = '100%';
            darkOverlay.style.height = '100%';
            darkOverlay.style.backgroundColor = 'black';
            darkOverlay.style.zIndex = '9998';
            darkOverlay.style.opacity = '0';
            darkOverlay.style.transition = 'opacity 1s';
          
            document.body.appendChild(darkOverlay);
            
            // Fade to black before redirecting
            requestAnimationFrame(() => {
              darkOverlay.style.opacity = '1';
            });
          
            setTimeout(() => {
              window.location.href = targetLink;
            }, 1000); // delay redirect till after fade
          }, 4000);
          
          
        }
      }
      zoomIn();
      break;
    }
  }
});

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  if (isRotating && modelGroup) {
    const currentY = modelGroup.rotation.y;
    const speed = 0.01;
    if (Math.abs(currentY - targetRotationY) > 0.01) {
      modelGroup.rotation.y += (targetRotationY - currentY) * speed;
    } else {
      modelGroup.rotation.y = targetRotationY;
      isRotating = false;
    }
  }

  renderer.render(scene, camera);
}
animate();

// Initial camera zoom-out effect on load
let zoomOutProgress = 0;
const initialPosition = new THREE.Vector3(0, 10, 10);
const finalPosition = new THREE.Vector3(30, 40, 60);

function zoomOutCamera() {
  zoomOutProgress += 0.01;
  camera.position.lerpVectors(initialPosition, finalPosition, zoomOutProgress);
  camera.lookAt(0, 0, 0);
  controls.update();

  if (zoomOutProgress < 1) {
    requestAnimationFrame(zoomOutCamera);
  }
}
zoomOutCamera();
