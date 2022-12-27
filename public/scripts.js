const serverLink = 'https://chatapp-sexh.onrender.com'
const username = prompt('What is your username?')
// const socket = io('http://localhost:9000'); // the / namespace/endpoint
const socket = io(serverLink, {
  query: {
    username,
  },
})
let nsSocket = ''
// listen for nsList, which is a list of all the namespaces.
socket.on('nsList', (nsData) => {
  console.log('The list of .rooms has arrived!!')

  let namespacesDiv = document.querySelector('.namespaces')
  namespacesDiv.innerHTML = ''
  nsData.forEach((ns) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint} ><img src="${ns.img}" /></div>`
  })

  // Add a clicklistener for each NS
  Array.from(document.getElementsByClassName('namespace')).forEach((elem) => {
    elem.addEventListener('click', (e) => {
      const nsEndpoint = elem.getAttribute('ns')
      joinNs(nsEndpoint)
    })
  })
  joinNs('/wiki')
})
