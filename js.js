const btnConsultar = document.getElementById('btnConsultar')
const btnlimpar = document.getElementById('btnLimpar')

const viewFunc = document.getElementById('viewFunc')
const viewEsta = document.getElementById('viewEsta')
const viewValor = document.getElementById('viewValor')
const viewEstaText = document.querySelectorAll('.ViewEstaTexto')


let func = document.getElementById('func')
let funcEstagiario = document.getElementById('funcEstagiario')
let valor = document.querySelector('.inputValor')

const resposta = document.querySelector('.hiden')

btnConsultar.addEventListener('click',function(e){
   

    let valorVenda = valor.value
    let quantidadeFuncionarios = Number(func.value)
    let quantidadeEstagiario = Number(funcEstagiario.value)
    let proporcaoFixo, proporcaoEstagiario
    let valorSemMascara = removeMascara(valorVenda)
    

    if(func.value == null || func.value == 0){
        alert('Insira a quantidade de funcionários')
        return
    }

    if(valorSemMascara == null||valorSemMascara == 0){
        alert('Digite o valor da meta do dia')
        return
    }


    ratio = quantidadeEstagiario/quantidadeFuncionarios

    if(quantidadeEstagiario == 0 && quantidadeFuncionarios > 0){
        proporcaoEstagiario = 0
        proporcaoFixo = 100
        viewEstaText[0].classList.add('hiden')

    } else if( quantidadeEstagiario > 0 ){
       viewEstaText[0].classList.remove('hiden')
    }    
    
    if(ratio < .5){
        proporcaoEstagiario = 10
        proporcaoFixo = 90
    }else if(ratio >= .5 && ratio <= 1.4){
        proporcaoFixo = 80
        proporcaoEstagiario = 20
    }else if(ratio > 1.5){
        proporcaoEstagiario = 40
        proporcaoFixo = 60
    }


    let valorFunc = (((valorSemMascara*proporcaoFixo)/100)/quantidadeFuncionarios).toFixed(2)
    let valorEstagio = (((valorSemMascara*proporcaoEstagiario)/100)/quantidadeEstagiario).toFixed(2)
  
    if(valorFunc == NaN || valorEstagio == NaN){
        return
    }
    
    viewValor.textContent = `R$ ${valorFunc}`
    viewEsta.textContent = `R$ ${valorEstagio}`
    viewFunc.textContent = `Estagiários(${quantidadeEstagiario}) + Fixos(${quantidadeFuncionarios}) = ${quantidadeEstagiario+quantidadeFuncionarios} `

    if (resposta.classList.contains('hiden')){
        resposta.classList.remove('hiden')
    }
   


})

btnlimpar.addEventListener('click', function(){
    if (!resposta.classList.contains('hiden')){
        resposta.classList.add('hiden')
    }   
    valor.value = ''
    func.value = ''
    funcEstagiario.value = ''
    


})

document.addEventListener('input',function(e){
    let valorMascarado = valor.value

    valorMascarado = valorMascarado.replace(/\D/g, '')
    valorMascarado = (valorMascarado/100).toFixed(2)
    valorMascarado = `R$ ${valorMascarado.replace('.',',')}`
    valor.value = valorMascarado

})

function removeMascara(valor){
    
    return parseFloat(valor.replace(/[^0-9,.]/g, '').replace(',','.'))

}