import { useState } from 'react';
import {
  AreaTexto,
  Botao,
  BotaoSecundario,
  Campo,
  Dica,
  Entrada,
  Erro,
  GrupoOpcoes,
  Opcao,
  Rotulo,
  Selecao,
} from '../ui/styles.js';
import { niveisUrgencia, ORDEM_TIPOS, ORDEM_URGENCIA, tiposOcorrencia } from '../../theme/colors.js';
import { Formulario, Linha, Rodape } from './styles.js';

function validar(dados) {
  const erros = {};
  if (dados.titulo.trim().length < 3) erros.titulo = 'Informe o local e o equipamento.';
  if (dados.endereco.trim().length < 5) erros.endereco = 'Informe o endereço.';
  if (dados.descricao.trim().length < 10) erros.descricao = 'Descreva a ocorrência (mínimo de 10 caracteres).';
  return erros;
}

// Formulário de dados da ocorrência, usado no registro e na edição.
// `tecnicos` (opcional) mostra o campo de técnico — só no registro.
export default function OcorrenciaForm({ inicial, onEnviar, rotuloEnviar, tecnicos, onDesistir, prefixoId = 'oc' }) {
  const [dados, setDados] = useState({ tecnicoId: '', ...inicial });
  // Na edição a urgência já foi decidida antes: não sobrescrever ao trocar o tipo.
  const [urgenciaManual, setUrgenciaManual] = useState(!!onDesistir);
  const [erros, setErros] = useState({});
  const id = (campo) => `${prefixoId}-${campo}`;

  const alterar = (campo) => (evento) => setDados((d) => ({ ...d, [campo]: evento.target.value }));

  const escolherTipo = (tipo) =>
    setDados((d) => ({
      ...d,
      tipo,
      urgencia: urgenciaManual ? d.urgencia : tiposOcorrencia[tipo].urgenciaSugerida,
    }));

  const escolherUrgencia = (urgencia) => {
    setUrgenciaManual(true);
    setDados((d) => ({ ...d, urgencia }));
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const encontrados = validar(dados);
    setErros(encontrados);
    if (Object.keys(encontrados).length) return;

    onEnviar({
      tipo: dados.tipo,
      urgencia: dados.urgencia,
      titulo: dados.titulo.trim(),
      endereco: dados.endereco.trim(),
      descricao: dados.descricao.trim(),
      tecnicoId: dados.tecnicoId || null,
    });
  };

  const campoTexto = (campo, rotulo, placeholder) => (
    <Campo>
      <Rotulo htmlFor={id(campo)}>{rotulo}</Rotulo>
      <Entrada
        id={id(campo)}
        placeholder={placeholder}
        value={dados[campo]}
        onChange={alterar(campo)}
        $erro={!!erros[campo]}
        aria-invalid={!!erros[campo]}
        aria-describedby={erros[campo] ? id(`erro-${campo}`) : undefined}
      />
      {erros[campo] && <Erro id={id(`erro-${campo}`)}>{erros[campo]}</Erro>}
    </Campo>
  );

  return (
    <Formulario onSubmit={enviar} noValidate>
      <Campo role="group" aria-labelledby={id('rotulo-tipo')}>
        <Rotulo as="span" id={id('rotulo-tipo')}>Tipo de ocorrência</Rotulo>
        <GrupoOpcoes>
          {ORDEM_TIPOS.map((tipo) => (
            <Opcao
              key={tipo}
              type="button"
              $ativa={dados.tipo === tipo}
              aria-pressed={dados.tipo === tipo}
              onClick={() => escolherTipo(tipo)}
            >
              {tiposOcorrencia[tipo].label}
            </Opcao>
          ))}
        </GrupoOpcoes>
      </Campo>

      <Campo role="group" aria-labelledby={id('rotulo-urgencia')}>
        <Rotulo as="span" id={id('rotulo-urgencia')}>Urgência</Rotulo>
        <GrupoOpcoes>
          {ORDEM_URGENCIA.map((urgencia) => {
            const nivel = niveisUrgencia[urgencia];
            return (
              <Opcao
                key={urgencia}
                type="button"
                $ativa={dados.urgencia === urgencia}
                $cor={nivel.color}
                $fundo={nivel.soft}
                aria-pressed={dados.urgencia === urgencia}
                onClick={() => escolherUrgencia(urgencia)}
              >
                {nivel.label}
              </Opcao>
            );
          })}
        </GrupoOpcoes>
        {!urgenciaManual && <Dica>Sugerida automaticamente para este tipo.</Dica>}
      </Campo>

      <Linha>
        {campoTexto('titulo', 'Local e equipamento', 'Ex.: Edifício Aurora - Elevador 2')}
        {campoTexto('endereco', 'Endereço', 'Rua, número - bairro, cidade')}
      </Linha>

      <Campo>
        <Rotulo htmlFor={id('descricao')}>Descrição</Rotulo>
        <AreaTexto
          id={id('descricao')}
          placeholder="O que aconteceu? Há passageiros na cabine? O equipamento está parado?"
          value={dados.descricao}
          onChange={alterar('descricao')}
          $erro={!!erros.descricao}
          aria-invalid={!!erros.descricao}
          aria-describedby={erros.descricao ? id('erro-descricao') : undefined}
        />
        {erros.descricao && <Erro id={id('erro-descricao')}>{erros.descricao}</Erro>}
      </Campo>

      {tecnicos && (
        <Campo>
          <Rotulo htmlFor={id('tecnico')}>Técnico (opcional)</Rotulo>
          <Selecao id={id('tecnico')} value={dados.tecnicoId} onChange={alterar('tecnicoId')}>
            <option value="">Designar depois</option>
            {tecnicos.map((t, indice) => (
              <option key={t.id} value={t.id}>
                {t.nome} · {t.emAberto} ativo(s){indice === 0 ? ' · sugerido' : ''}
              </option>
            ))}
          </Selecao>
          <Dica>Lista ordenada pela menor carga de chamados ativos.</Dica>
        </Campo>
      )}

      <Rodape>
        {onDesistir && (
          <BotaoSecundario type="button" onClick={onDesistir}>
            Descartar alterações
          </BotaoSecundario>
        )}
        <Botao type="submit">{rotuloEnviar}</Botao>
      </Rodape>
    </Formulario>
  );
}
