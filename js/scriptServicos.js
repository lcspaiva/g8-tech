//**** OO da pág 4 ******/

// criando o objeto da classe serviço, a classe servia como uma interface para chamar os métodos
// que propiciarão a criação do comportamento da página
class Servico{
    constructor(){
        this.id = 0;
        this.qntServ = 0;
        this.valor = 0;
        this.arrayServicos = []
        this.precoBase = [4000, 3000, 8000, 2500, 1500, 9000, 5000, 5000, 7500, 3500];
        this.multiplicador = [1,2,7,20]
    }
    salvar(){
        // pegando as infos contidas nos campos
        let desc = $("#desc").val();

        // pegando ql a pos do servico
        let serv = $("#servicosSel").val();
        console.log("serviço: " + typeof(serv));
        let servicoSelecionado = serv;

        let tamEmpresa = $("input[name='tamanhoEmpresa']:checked").val()
        // console.log(this.int2Tam(tamEmpresa))

        // validando os campos, se tiver tudo ok, add na tabela
        if(!this.validaCampos(desc)){
            this.msgErro(desc);
        }else{
            $("#desc").css({border: "2px solid gold"})
            let id = this.id;
            // console.log("id:" + id)
            // limpar os butoes dps de selecionados

            let preco = this.precificar(servicoSelecionado, tamEmpresa)
            this.valor += preco;

            this.qntServ += 1;

            // console.log("total:" + this.valor);
            // console.log("quantidade serviços" + this.qntServ);

            // criando o obj do servico e add ele no array de servicos
            let servico = {}
            servico.id = id;
            servico.tipo = servicoSelecionado;
            servico.tam = tamEmpresa;
            servico.preco = preco;
            servico.desc = desc;
            this.arrayServicos.push(servico);
            this.id++;
        }

        // atualizando o valor dos cards
        this.cancelar();
        this.atualizaNota();
        this.listaTabela();
    }

    // verifica quais campos estão com informaçoes incompletas e exibe uma msg de erro
    // mais complea
    msgErro(texto){
        let msgFinal = ""
        let msg1 = "- A descrição do serviço deve conter no mínimo 6 caracteres";
        let msg2 = "- Selecione 1 serviço, por favor";
        if(texto.length < 6){
            msgFinal += msg1
        }
        if($("#servicosSel").val()=="-1"){
            msgFinal += "\n" + msg2
        }
        alert(msgFinal);
    }//msgErro

    listaTabela(){
        // criando a variavel que nos permitirá interagir com a tabela
        let tbody = document.getElementById("tbody")

        // limpando a tabela
        // $(tbody).prop("text","");
        tbody.innerText = "";

        for(let i=0; i<this.arrayServicos.length; i++){
            // inserindo uma nova linha
            let novaLinha = tbody.insertRow();

            // criando os campos
            let td_id = novaLinha.insertCell();
            let td_tipo = novaLinha.insertCell();
            let td_tam = novaLinha.insertCell();
            let td_preco = novaLinha.insertCell();
            let td_desc = novaLinha.insertCell();
            let td_acoes = novaLinha.insertCell();

            // alimentando os campos
            td_id.innerText = this.arrayServicos[i].id;
            td_tipo.innerText = this.int2Servico(this.arrayServicos[i].tipo);
            td_tam.innerText = this.int2Tam(this.arrayServicos[i].tam);
            td_preco.innerText = this.arrayServicos[i].preco;
            td_desc.innerText = this.arrayServicos[i].desc;
            
            // add classes para eles ficarem centralizados
            td_id.classList.add("center");
            td_tipo.classList.add("center");
            td_tam.classList.add("center");
            td_preco.classList.add("center");
            td_desc.classList.add("center");
            td_acoes.classList.add("center");
            
            // criando elemento de img para ser colocado na quarta coluna da tabela
            let imgEdit = document.createElement("img");
            // atribuindo a esse elemento o caminho
            imgEdit.src = "imagens/edit.png";
            // add a classe img-icon para formatar a imagem de icone
            imgEdit.classList.add("img-icon");
            // transformando o mouse em maozinha quando passar pela imagem
            $(imgEdit).css({cursor:"pointer"});
            // adicionando um filho para a quarta coluna
            $(td_acoes).append(imgEdit);
            // adicionando o evento de click
            $(imgEdit).attr("onclick", "servico.editaDados(" + i + ")");

            // criando elemento de img para ser colocado na quarta coluna da tabela
            let imgDelete = document.createElement("img");
            // atribuindo a esse elemento o caminho
            imgDelete.src = "imagens/delete.png";
            // add a classe img-icon para formatar a imagem de icone
            imgDelete.classList.add("img-icon");
            // transformando o mouse em maozinha quando passar pela imagem      
            $(imgDelete).css({cursor:"pointer"});
            // adicionando um filho para a quarta coluna
            $(td_acoes).append(imgDelete);
            // adicionando o evento de click
            // imgDelete.setAttribute("onclick", "servico.deletaDados(" + this.arrayServicos[i].id + ")");
            $(imgDelete).attr("onclick", "servico.deletaDados(" + i + ")");

            // criando elemento de img para ser colocado na quarta coluna da tabela
            let imgView = document.createElement("img");
            // atribuindo a esse elemento o caminho
            imgView.src = "imagens/view.svg";
            // add a classe img-icon para formatar a imagem de icone
            imgView.classList.add("img-icon");
            // transformando o mouse em maozinha quando passar pela imagem  
            $(imgView).css({cursor:"pointer"});
            // adicionando um filho para a quarta coluna
            $(td_acoes).append(imgView);   
            // imgView.setAttribute("onclick", "servico.verDados(" + this.arrayServicos[i].id + ")");
            $(imgView).attr("onclick", "servico.verDados(" + this.arrayServicos[i].id + ")");
        }//for i
    }//listarTabela

    // poe os dados de volta no campo de preenchimento
    editaDados(indx){
        // pegar os valores e pôr nos campos de volta
        $("#desc").val(this.arrayServicos[indx].desc);
        // console.log("pos: " + (Number(this.arrayServicos[indx].tipo)+1))
        $("#sel" + (Number(this.arrayServicos[indx].tipo))).prop("selected", true);
        $("#tamanhoEmpresa" + (Number(this.arrayServicos[indx].tam)+1)).prop("checked",true);

        // this.qntServ--;
        // this.valor -= Number(this.arrayServicos[indx].preco);
        
        this.arrayServicos.splice(indx, 1);
        this.atualizaNota();
        this.listaTabela();
    }//mostrarDados

    deletaDados(indx){
        if(confirm("Você deseja mesmo deletar?")){
            this.arrayServicos.splice(indx, 1);
            this.atualizaNota();
            this.listaTabela();
        }
    }//deletarDados

    // abrir uma janelinha
    // dar a possibilidade do cara ver a precificação 
    verDados(indx){
        let id = this.arrayServicos[indx].id;
        // console.log("id" + id);

        let desc = this.arrayServicos[indx].desc;
        // console.log("desc" + desc);

        let preco = this.arrayServicos[indx].preco;
        // console.log("preco" + preco);

        let tipo = this.int2Servico(this.arrayServicos[indx].tipo);
        // console.log("tipo" + tipo);

        let tamEmpresa = this.int2Tam(this.arrayServicos[indx].tam);
        // console.log("tamanho da Empresa" + tamEmpresa)

        console.log("\n Descrevendo a Precificação")
        let precoBase = this.precoBase[Number(this.arrayServicos[indx].tipo)]
        // console.log("valor Base", precoBase);

        let multiplicador = this.multiplicador[Number(this.arrayServicos[indx].tam)]
        let texto = ("id: " + id + "\n" +
                    "desc: " + desc + "\n" +
                    "preco: " + preco + "\n" +
                    "tipo: " + tipo + "\n" +
                    "tamanho Empresa: " + tamEmpresa + "\n" +
                    "preco Base: " + precoBase + "\n" +
                    "multiplicador: " + multiplicador)

       console.log(texto)

        $("#txtAlerta").text(texto);
        $("#caixaAlerta").show();
    }//viewDados

    // setar os campos para um estado default, antes de qualquer interação
    cancelar(){
        $("#desc").val("");
        $("#defaultSel").prop("selected", true); //mudar
        $("#tamanhoEmpresa1").prop("checked", true);
    }//cancela

    // fará a validação dos campos inseridos pelo usuario
    // retorna um booleano informando se estão OK
    validaCampos(texto){
        if(texto.length < 6 || $("#servicosSel").val()=="-1"){
            return false;
        } //false
        return true;
    }//valida campos

    // atualiza o card de preços com os valores contidos no objeto
    atualizaNota(){
        let cont = 0;
        for(let i=0; i<this.arrayServicos.length; i++){
            cont += Number(this.arrayServicos[i].preco)
        }
        $("#valorTotal").text(cont);
        $("#qntServicos").text(this.arrayServicos.length);
    }

    // dado um id de servico e um id de tamanho de empresa, retorna o valor a ser cobrado pelo ser
    // viço
    // retorna o valor a ser cobrado pelo serviço
    // serv é o id do serviço
    // mult é o id do tam da empresa
    precificar(serv, mult){   
        let vetServico = this.precoBase;
        let vetMultiplicador = this.multiplicador;
    
        return vetServico[Number(serv)] * vetMultiplicador[Number(mult)]
    }//precificar
    
    // dado um numero retorna o uma string com o serviço daquela posição
    int2Servico(numero){
        let vetorServicos = ["Web design profissional", 
        "Criação de páginas web", "Hospedagem de Websites",
        "Aplicativos móveis", "Landing Pages", "Criação de Loja Online", 
        "Manutenção de Websites","Otimização de Websites", "Desenvolvimento web", 
        "Suporte para website"]
           
        let opcao = parseInt(numero);
    
        if (opcao >= vetorServicos.length){
            return "Error"
        }
        return vetorServicos[opcao];
    } //int2Serviço

    // dada um int retorna o uma string do tamanho da empresa associado aquele numero
    int2Tam(numero){
        let vetTam = ["Pequena", "Média", "Grande", "Multinacional"]
    
        let opcao = parseInt(numero);
    
        if (opcao > 3){
            return "Error"
        }
        return vetTam[opcao];
    }//int2Tam

}

var servico = new Servico();

// ******** FUNÇOES DE PROPÓSITO GERAL **********
// comportamento do xiszinho de fechar
$("#botaoFecha").on("click", () => {
    $("#caixaAlerta").hide();
})

$("#botaoConfirma").on("click", () => {
    $("#caixaAlerta").hide();
})


// Botão de acessibilidade
$("#acess1").on("click", () => {
    $("h1, h2, section, .alerta, .footer, #acess1").toggleClass("zoom01")
    $(".header").toggleClass("zoom02")
})
