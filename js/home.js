var objDadosDeCadastro = JSON.parse(localStorage.getItem('dados'));
var CNPJdaEmpresa = objDadosDeCadastro.CNPJ;

function existeArmazenado(key) {
    if (localStorage.getItem(key) == null) {
        r = false;
    } else {
        r = true;
    }

    return r;
}

function getDadosByCod(cod) {
    let db = JSON.parse(localStorage.getItem(`${CNPJdaEmpresa}`));
    let dados = '';
    for (i = 0; i < db.produtos.length; i++) {
        if (db.produtos[i].codigo == cod) {
            dados = db.produtos[i];
        }
    }
    return dados;
}

function getDadosByDesc(desc) {
    let db = JSON.parse(localStorage.getItem(`${CNPJdaEmpresa}`));
    let dados = '';
    for (i = 0; i < db.produtos.length; i++) {
        if (db.produtos[i].descricao == desc) {
            dados = db.produtos[i];
        }
    }

    return dados;
}

function consultar() {
    let consulta = document.getElementById('consulta').value;
    let esp = document.getElementById('pesquisa').value;

    if (esp == "descricao") {
        d = getDadosByDesc(consulta);
    } else {
        d = getDadosByCod(consulta);
    }
    
    //alert(typeof(d));
    console.log(typeof(d));
    if(d == ''){
        let cardTable= document.getElementById('card-body-table-produtos');
        let strError = `<div class="row">
                            <div class="col-12 h4">
                                Ops, ocorreu um erro :(. Verifique se está pesquisando pela coisa certa. <br>
                                    Se estiver, o produto não está cadastrado. Cadastre-o clicando <a href="../../html/inclusao em estoque/inclusao.html"> aqui </a>. 
                            </div>
                        </div>`;

        cardTable.innerHTML = strError;
    }else{
        escreveConsulta(d);
    }
}

function escreveConsulta(d) {
    let table = document.getElementById('table-body-produtos');
    let inHTMLtable;

    inHTMLtable = `<tr>
                        <th class="text-center">${d['codigo']}</th>
                        <td>${d['descricao']}</td>
                        <td>${d['quantidade']}</td>
                        <td>${d['valor']}</td>
                    </tr>`;

    table.innerHTML = inHTMLtable;

}

window.onload = () => {
    if (existeArmazenado(`${CNPJdaEmpresa}`)) {
        
        document.querySelector('#btnConsultar').addEventListener('click', consultar);

        document.querySelector('#consulta').addEventListener('keydown',(e) => {
            if(e.keyCode == 13){
                consultar();
                e.preventDefault();
            }
        });
    } else {
        
        let cardTable= document.getElementById('card-body-table-produtos');
        let strError = `<div class="row">
                            <div class="col-12 h4">
                                Não produtos há cadastrados :( Cadastre clicando <a href="../../html/inclusao em estoque/inclusao.html"> aqui </a>. 
                            </div>
                        </div>`;

        cardTable.innerHTML = strError;
    }
}