//formacion de la figura 2D apartir de sus vertices para asegurar su correcta formacion
function poligono(nlados, ladoigual) {
  const vertices = [];

  const ang = 2*Math.PI/nlados;

  for (let i = 0; i < nlados; i++) { // Corregimos el límite del loop
      let x = ladoigual * Math.cos(i * ang);
      let y = ladoigual * Math.sin(i * ang);
      vertices[i] = new THREE.Vector3(x, y, 0);
  }
  
  //retornamos los vertices para usarlo en la funcion troncoPiramide
  return vertices;
}

//funcion que termina de crar el tronco de piramide en 3d usando parametros pedidos.

function troncoPiramide(altura, nlados, ladosigual, porcentajeApotemaBaseSup) {

  // Obtenemos los vertices del poligono regular que usaremos como base superior e inferior
  const vertices = poligono(nlados, ladosigual);
  
  // Calculamos los apotemas y radios de las bases
  const apotemaBaseInf = ladosigual / (2 * Math.tan(Math.PI / nlados)); // Apotema de la base inferior
  const apotemaBaseSup = apotemaBaseInf * porcentajeApotemaBaseSup / 100; // Apotema de la base superior (se calcula como un porcentaje del apotema de la base inferior)
  const radioBaseInf = apotemaBaseInf / Math.tan(Math.PI / nlados); // Radio de la base inferior
  const radioBaseSup = apotemaBaseSup / Math.tan(Math.PI / nlados); // Radio de la base superior
  const alturaPiramide = altura - apotemaBaseSup; // Altura de la parte piramidal del tronco

  // Creamos las geometrias de las bases y el cuerpo
  const geometriaBaseInf = new THREE.BufferGeometry().setFromPoints(vertices); 
  const geometriaBaseSup = new THREE.BufferGeometry().setFromPoints(vertices); 
  const geometriaCuerpo = new THREE.CylinderGeometry(radioBaseInf, radioBaseSup, alturaPiramide, nlados); 

  // Creamos el material para todas las partes de la figura
  const material = new THREE.MeshBasicMaterial({ color: 0xFFA500 });

  const materialVertices = new THREE.LineBasicMaterial({color: 0x000000});

  // Creamos las mallas de las bases y el cuerpo
  const baseInf = new THREE.Mesh(geometriaBaseInf, material); 
  const baseSup = new THREE.Mesh(geometriaBaseSup, material); 
  const cuerpo = new THREE.Mesh(geometriaCuerpo, material); 
  const meshVertices = new THREE.LineLoop(geometriaCuerpo, materialVertices);
  
  // Colocamos las bases y el cuerpo en su posición correcta
  baseInf.position.y = alturaPiramide / -2; 
  baseSup.position.y = altura - apotemaBaseSup / 2; 
  cuerpo.position.y = (altura - apotemaBaseSup) / 2; 
  meshVertices.position.y= (altura - apotemaBaseSup) / 2; 

  // Agrupamos las partes en un objeto Group de Three.js
  const group = new THREE.Group();

  group.add(cuerpo);
  group.add(meshVertices)
  // Retornamos el objeto Group
  return group;
}
