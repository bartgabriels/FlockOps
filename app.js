const KEY = 'schapentracker:data'
const state = { paddocks: [], sheep: [] }

function load(){
  const raw = localStorage.getItem(KEY)
  if(raw) Object.assign(state, JSON.parse(raw))
}
function save(){ localStorage.setItem(KEY, JSON.stringify(state)) }

function render(){
  const paddockList = document.getElementById('paddock-list')
  const sheepList = document.getElementById('sheep-list')
  const sheepPaddock = document.getElementById('sheep-paddock')

  paddockList.innerHTML = state.paddocks.map(p=>`<li data-id="${p.id}">${p.name}</li>`).join('') || '<li><em>Geen weides</em></li>'
  sheepList.innerHTML = state.sheep.map(s=>`<li>${s.tag} — ${paddockName(s.paddockId)}</li>`).join('') || '<li><em>Geen schapen</em></li>'

  sheepPaddock.innerHTML = `<option value="">Kies weide</option>` + state.paddocks.map(p=>`<option value="${p.id}">${p.name}</option>`).join('')
}

function paddockName(id){
  const p = state.paddocks.find(x=>x.id===id)
  return p ? p.name : 'Onbekend'
}

function uid(){ return Math.random().toString(36).slice(2,9) }

document.getElementById('paddock-form').addEventListener('submit',e=>{
  e.preventDefault()
  const name = document.getElementById('paddock-name').value.trim()
  if(!name) return
  state.paddocks.push({id:uid(),name})
  document.getElementById('paddock-name').value=''
  save(); render()
})

document.getElementById('sheep-form').addEventListener('submit',e=>{
  e.preventDefault()
  const tag = document.getElementById('sheep-tag').value.trim()
  const paddockId = document.getElementById('sheep-paddock').value
  if(!tag || !paddockId) return
  state.sheep.push({id:uid(),tag,paddockId})
  document.getElementById('sheep-tag').value=''
  save(); render()
})

load(); render()
