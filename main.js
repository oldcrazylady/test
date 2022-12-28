// let nodo = {
//     nombre: undefined,
//     padre: null,
//     hijos: null,


// }
// function convertToArray(listNodes){
//     if(!listNodes) return null;
//     return Array.from(listNodes);
// }
// function generateArrayDOM(){
//     let DOM = [];

//     let rootNode = convertToArray(document.childNodes).filter((c) => c.nodeName == "HTML");
//     let currentLevel = convertToArray(rootNode[0].childNodes);
//     DOM.push(rootNode);
//     DOM.push(currentLevel);
//     generateLevels(currentLevel,DOM);

//     return DOM;
// }

// function generateLevels(currentLevel,DOM){
//     if(currentLevel[0] == undefined) return;

//     let newLevel = [];
//     for (let element of currentLevel) {
//         if(element.childNodes)
//             newLevel = newLevel.concat(convertToArray(element.childNodes))
//     }
//     if(newLevel[0] != undefined){
//         DOM.push(newLevel);
//         currentLevel = newLevel;   
//         return generateLevels(currentLevel, DOM);       
//     }
//     return;
// }


// function domToLists(content,rootDOM,contador){
//     let actual = "<ul><li>";
//     actual += `<h3 class=h3-${contador.toString()}> ${rootDOM.nodeName} </h3>`;

//     contador++;  
//     if(rootDOM.childNodes){
//         for (child of rootDOM.childNodes)
//             actual += domToLists(content,child,contador);
//     }
//     return actual + "</li></ul>";
// }

// function newClass(name, content){
//     let sheet = document.createElement('style')
//     sheet.innerHTML = `.${name} ${content}`;
//     document.head.appendChild(sheet);
// }


function generateDomTree(rootDOM){
    let content = '';
    let contador = 1;

    function domToLists(currentNode,contador){
        let actual = "<ul><li>";
        actual += `<h3 class=h3-${contador.toString()}>${currentNode.nodeName}</h3>`;
        contador++;  

        if(currentNode.childNodes){
            for (child of currentNode.childNodes)
                actual += domToLists(child,contador);
        }
        return actual + "</li></ul>";
    }

    content = domToLists(rootDOM,contador);
    return content;
}

const btn = document.getElementById("btn");

btn.addEventListener("click",() => {

    const htmlString = document.getElementById("htmlentry").value;
    const box = document.getElementById("dom-tree");
    const node = new DOMParser().parseFromString(htmlString, "text/html");
    box.innerHTML = generateDomTree(node.childNodes[1]);
    box.style.display = "block";
    addClasesOfColors(box);
})


function addClasesOfColors(container){

    let h = container.getElementsByTagName("h3");
    
    let pattern = /\d+/g;
    let current;
    let max = 1;
    // Averiguar cuantas clases necesito
    for (element of h) {
        current = parseInt(element.className.match(pattern)[1])
        if(current > max) max = current;
    }

    // Crear cada clase con un color distinto y asociar nombre unico
    let sheets = [];
    for(let i=1; i<=max; i++){

        let color = createColor(max);
        let sheet = document.createElement('style');
        sheets.push(sheet);
        sheets[i-1].innerHTML = `.h3-${i} {background-color:${color};}`;
    }
    document.body.append(...sheets)
}



function createColor(cant){
    let saltos = Math.round(360 / cant);    

    let h,s,v;
    s = "100%";
    v = "100%";
    return  '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();



}



    














    

    



