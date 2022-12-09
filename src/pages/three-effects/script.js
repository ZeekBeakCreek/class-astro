import * as THREE from "./three.module.js";
import { Vector2 } from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
import { EffectComposer } from "./EffectComposer.js";
import { RenderPixelatedPass } from "./RenderPixelatedPass.js";

import { GUI } from "./dat.gui.module.js";
import { CircleGeometry } from "three";

let screenResolution,
  camera,
  scene,
  renderer,
  composer,
  renderPixelatedPass,
  controls,
  // ballGeometry,
  // triangleGeometry,
  crystalMesh,
  booxGeometry;
let gui, params;

init();
animate();

function onWindowResize() {
  screenResolution.set(window.innerWidth, window.innerHeight);
  const aspectRatio = screenResolution.x / screenResolution.y;
  camera.left = -aspectRatio;
  camera.right = aspectRatio;
  camera.updateProjectionMatrix();
  renderer.setSize(screenResolution.x, screenResolution.y);
  renderPixelatedPass.setSize(screenResolution.x, screenResolution.y);
}

function init() {
  screenResolution = new Vector2(window.innerWidth, window.innerHeight);
  const aspectRatio = screenResolution.x / screenResolution.y;

  camera = new THREE.OrthographicCamera(
    -aspectRatio,
    aspectRatio,
    1,
    -1,
    0.1,
    10
  );
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x151729);

  renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.shadowMap.enabled = true;
  renderer.setSize(screenResolution.x, screenResolution.y);
  document.body.appendChild(renderer.domElement);

  composer = new EffectComposer(renderer);
  renderPixelatedPass = new RenderPixelatedPass(
    screenResolution,
    4,
    scene,
    camera
  );
  composer.addPass(renderPixelatedPass);

  window.addEventListener("resize", onWindowResize);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  camera.position.z = 2;
  camera.position.y = 2 * Math.tan(Math.PI / 6);
  controls.update();
  // controls.minPolarAngle = controls.maxPolarAngle = controls.getPolarAngle();

  gui = new GUI();
  params = {
    pixelSize: 4,
    normalEdgeStrength: 0.3,
    depthEdgeStrength: 0.4,
  };
  gui
    .add(params, "pixelSize")
    .min(1)
    .max(16)
    .step(1)
    .onChange(() => {
      renderPixelatedPass.setPixelSize(params.pixelSize);
    });
  gui.add(renderPixelatedPass, "normalEdgeStrength").min(0).max(2).step(0.05);
  gui.add(renderPixelatedPass, "depthEdgeStrength").min(0).max(1).step(0.05);

  const texLoader = new THREE.TextureLoader();
  const tex_checker = pixelTexture(texLoader.load("/textures/checker.png"));
  const tex_checker2 = pixelTexture(texLoader.load("/textures/checker.png"));
  tex_checker.repeat.set(3, 3);
  tex_checker2.repeat.set(1.5, 1.5);

  // Setup geometry
  const boxMaterial = new THREE.MeshPhongMaterial({ map: tex_checker2 });
  function addBox(boxSideLength, x, z, rotation) {
    let mesh = new THREE.Mesh(
      new THREE.BoxGeometry(boxSideLength, boxSideLength, boxSideLength),
      boxMaterial
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.rotation.y = rotation;
    mesh.position.y = boxSideLength / 2;
    mesh.position.set(x, boxSideLength / 2 + 0.0001, z);
    scene.add(mesh);
    return mesh;
  }
  addBox(0.4, 0, 0, Math.PI / 4);
  addBox(0.5, -0.5, -0.5, Math.PI / 4);

  const planeSideLength = 2;
  const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(planeSideLength, planeSideLength),
    new THREE.MeshPhongMaterial({ map: tex_checker })
  );
  planeMesh.receiveShadow = true;
  planeMesh.rotation.x = -Math.PI / 2;
  scene.add(planeMesh);

  const radius = 0.2;
  const geo = new THREE.IcosahedronGeometry(radius);
  crystalMesh = new THREE.Mesh(
    geo,
    new THREE.MeshPhongMaterial({
      color: 0x2379cf,
      emissive: 0x143542,
      shininess: 10,
      specular: 0xffffff,
    })
  );
  crystalMesh.receiveShadow = true;
  crystalMesh.castShadow = true;
  scene.add(crystalMesh);

  // const geometry = new THREE.TetrahedronGeometry(radius);
  // triangleGeometry = new THREE.Mesh(
  //   geometry,
  //   new THREE.MeshPhongMaterial({
  //     color: 0x2379cf,
  //     emissive: 0x143542,
  //     shininess: 10,
  //     specular: 0xffffff,
  //   })
  // );
  // triangleGeometry.receiveShadow = true;
  // triangleGeometry.castShadow = true;
  // scene.add(triangleGeometry);

  // const geo = new THREE.SphereGeometry(radius);
  // ballGeometry = new THREE.Mesh(
  //   geo,
  //   new THREE.MeshPhongMaterial({
  //     color: 0x2379cf,
  //     emissive: 0x143542,
  //     shininess: 10,
  //     specular: 0xffffff,
  //   })
  // );
  // ballGeometry.receiveShadow = true;
  // ballGeometry.castShadow = true;
  // scene.add(ballGeometry);

  const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
  booxGeometry = new THREE.Mesh(
    geometry,
    new THREE.MeshPhongMaterial({
      color: 0x2379cf,
      emissive: 0x143542,
      shininess: 10,
      specular: 0xffffff,
    })
  );
  booxGeometry.receiveShadow = true;
  booxGeometry.castShadow = true;
  scene.add(booxGeometry);

  // Setup lights
  scene.add(new THREE.AmbientLight(0x2d3645, 1.5));

  const directionalLight = new THREE.DirectionalLight(0xfffc9c, 0.5);
  directionalLight.position.set(100, 100, 100);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(2048, 2048);
  scene.add(directionalLight);

  const spotLight = new THREE.SpotLight(0xff8800, 1, 10, Math.PI / 16, 0.02, 2);
  spotLight.position.set(2, 2, 0);
  const target = spotLight.target;
  scene.add(target);
  target.position.set(0, 0, 0);
  spotLight.castShadow = true;
  scene.add(spotLight);
}

function animate() {
  requestAnimationFrame(animate);
  const t = performance.now() / 1000;
  // crystalMesh.material.emissiveIntensity = Math.sin(t * 3) * 0.5 + 0.5;
  // crystalMesh.position.y = 0.7 + Math.sin(t * 2) * 0.05;
  // crystalMesh.rotation.y = stopGoEased(t, 2, 4) * 2 * Math.PI;

  // triangleGeometry.material.emissiveIntensity = Math.sin(t * 3) * 0.5 + 0.5;
  // triangleGeometry.position.y = 0.7 + Math.sin(t * 2) * 0.05;
  // triangleGeometry.rotation.y = stopGoEased(t, 2, 4) * 2 * Math.PI;
  // ballGeometry.material.emissiveIntensity = Math.sin(t * 3) * 0.5 + 0.5;
  // ballGeometry.position.y = 0.7 + Math.sin(t * 2) * 0.05;
  // ballGeometry.rotation.y = stopGoEased(t, 2, 4) * 2 * Math.PI;

  booxGeometry.material.emissiveIntensity = Math.sin(t * 3) * 0.5 + 0.5;
  booxGeometry.position.y = 0.7 + Math.sin(t * 2) * 0.05;
  booxGeometry.rotation.y = stopGoEased(t, 2, 4) * 2 * Math.PI;

  crystalMesh.material.emissiveIntensity = Math.sin(t * 3) * 0.4 + 0.4;
  crystalMesh.position.x = -0.48;
  crystalMesh.position.y = 0.8 + Math.sin(t * 2) * -0.04;
  crystalMesh.rotation.y = stopGoEased(t, 2, 4) * 2 * -Math.PI;
  crystalMesh.position.z = -0.49;

  // ballGeometry.material.emissiveIntensity = Math.sin(t * 3) * 0.4 + 0.4;
  // ballGeometry.position.x = -0.48;
  // ballGeometry.position.y = 0.8 + Math.sin(t * 2) * -0.04;
  // ballGeometry.rotation.y = stopGoEased(t, 2, 4) * 2 * Math.PI;
  // ballGeometry.position.z = -0.49;

  // 0.4, 0, 0, Math.PI / 4
  // 0.5, -0.5, -0.5, Math.PI / 4
  composer.render();
}

// Helper functions

function pixelTexture(texture) {
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function easeInOutCubic(x) {
  return x ** 2 * 3 - x ** 3 * 2;
}

function clamp(x, min, max) {
  return Math.min(max, Math.max(min, x));
}

function linearStep(x, edge0, edge1) {
  const w = edge1 - edge0;
  const m = 1 / w;
  const y0 = -m * edge0;
  return clamp(y0 + m * x, 0, 1);
}

function stopGoEased(x, downtime, period) {
  const cycle = (x / period) | 0;
  const tween = x - cycle * period;
  const linStep = easeInOutCubic(linearStep(tween, downtime, period));
  return cycle + linStep;
}
