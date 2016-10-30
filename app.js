const canvas = document.getElementById('tela');
const context = canvas.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const COR_NOS = 'green'

let inicializar_canvas = () => {
	context.fillStyle = 'white';
	context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

let desenhar_no = (no, x, y, width, heigth) => {
	context.beginPath();
	context.arc(x, y, width, 0, 2 * Math.PI, true);
	context.fillStyle = COR_NOS;
	context.fill();
}


let desenhar_arco = (x, y, x2, y2) => {
	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(x2, y2);
	context.stroke();
}


let desenhar_arvore = (arvore, tamanho_nos, margem_niveis) => {
	const niveis_arvore = Math.log(arvore.nos.length) / Math.log(arvore.ordem); // <=> log[2, arvore.ordem]

	let passo_x_anterior;


	for (var nivel = 0; nivel < niveis_arvore; nivel++) {

		const passo_x = CANVAS_WIDTH / Math.pow(arvore.ordem, nivel);


		for (let posicao_na_geracao = 0; posicao_na_geracao < Math.pow(2, nivel); posicao_na_geracao++) {


			const x_central = passo_x / 2 + passo_x * posicao_na_geracao;
			const y_central = tamanho_nos.y * 2 + nivel * (margem_niveis + tamanho_nos.y);

			desenhar_no(
				arvore.nos[Math.pow(2, nivel) - 1 + posicao_na_geracao],
				x_central,
				y_central,
				tamanho_nos.x,
				tamanho_nos.y);

			if (nivel > 0)
				desenhar_arco(
					x_central,
					y_central - tamanho_nos.y, //y superior

					passo_x_anterior / 2 + passo_x_anterior * Math.floor(posicao_na_geracao / arvore.ordem) + tamanho_nos.x / 2 * (posicao_na_geracao % 2 == 0 ? -1 : 1),
					y_central - margem_niveis //y inferior do nível pai
				)

		}
		passo_x_anterior = passo_x;
	}
}

inicializar_canvas();

const arvore_teste = {
	ordem: 2,
	nos: "abcdefghijklmnop".split("").map((letra) => {
		return {
			valor: letra
		}

	})
}

desenhar_arvore(arvore_teste, {
	x: 25,
	y: 25
}, 75);