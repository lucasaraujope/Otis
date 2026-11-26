import { useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Tag from '../../components/Tag/Tag.jsx';
import Alertas from '../../components/Alertas/Alertas.jsx';
import OcorrenciaForm from '../../components/OcorrenciaForm/OcorrenciaForm.jsx';
import {
  AreaTexto,
  Botao,
  BotaoPerigo,
  BotaoSecundario,
  Campo,
  Dica,
  Entrada,
  Erro,
  GrupoOpcoes,
  Opcao,
  Painel,
  PainelTitulo,
  Rotulo,
  Selecao,
} from '../../components/ui/styles.js';
import { buscarFuncionario } from '../../data/funcionarios.js';
import { useOcorrencias } from '../../store/OcorrenciasContext.jsx';
import { useAcesso } from '../../store/AcessoContext.jsx';
import {
  niveisUrgencia,
  REINCIDENCIA,
  SLA_HORAS,
  STATUS,
  statusCores,
  tagTipo,
  tiposOcorrencia,
} from '../../theme/colors.js';
import {
  andamento,
  chaveEquipamento,
  estaAtiva,
  falhasRecentesPorEquipamento,
  formatarDataHora,
  formatarDuracao,
  reincidenciaDe,
  situacaoSla,
  tecnicosPorDisponibilidade,
  tempoDeAtendimento,
  tempoEmEspera,
} from '../../utils/ocorrencias.js';
import { Pagina, Voltar, PageTitle, PageSub } from '../NovaOcorrencia/styles.js';
import {
  Aviso,
  Selos,
  Colunas,
  Tags,
  Dados,
  Item,
  Rotulo as RotuloDado,
  Valor,
  Texto,
  Linha,
  Evento,
  Secao,
  Acoes,
  ListaSimples,
} from './styles.js';

function textoSla(o) {
  const sla = situacaoSla(o);
  const prazo = `${SLA_HORAS[o.urgencia]} h`;
  switch (sla.situacao) {
    case 'ok':
      return `${prazo} · restam ${formatarDuracao(sla.restante)}`;
    case 'atencao':
      return `${prazo} · vence em ${formatarDuracao(sla.restante)}`;
    case 'cumprido':
      return `${prazo} · cumprido`;
    case 'estourado':
      return `${prazo} · estourado em ${formatarDuracao(-sla.restante)}`;
    default:
      return `${prazo} · não se aplica`;
  }
}

function LinhaDoTempo({ ocorrencia, tecnico }) {
  const eventos = [
    { quando: ocorrencia.abertura, texto: 'Ocorrência registrada' },
    ocorrencia.atribuicao && {
      quando: ocorrencia.atribuicao,
      texto: `Técnico designado${tecnico ? `: ${tecnico.nome}` : ''}`,
    },
    ocorrencia.inicio && { quando: ocorrencia.inicio, texto: 'Atendimento iniciado' },
    ocorrencia.editadaEm && { quando: ocorrencia.editadaEm, texto: 'Dados corrigidos' },
    ocorrencia.encerramento && {
      quando: ocorrencia.encerramento,
      texto: ocorrencia.status === STATUS.CONCLUIDO ? 'Encerrada com sucesso' : 'Encerrada sem solução',
    },
    ocorrencia.cancelamento && { quando: ocorrencia.cancelamento, texto: 'Ocorrência cancelada' },
  ]
    .filter(Boolean)
    .sort((a, b) => a.quando.localeCompare(b.quando));

  return (
    <Linha>
      {eventos.map((evento) => (
        <Evento key={evento.texto}>
          <strong>{evento.texto}</strong>
          <span>{formatarDataHora(evento.quando)}</span>
        </Evento>
      ))}
    </Linha>
  );
}

function Tratamento({ ocorrencia, onFeito, onEditar }) {
  const { ocorrencias, designar, iniciar, encerrar, cancelar } = useOcorrencias();
  const acesso = useAcesso();
  const tecnicos = useMemo(() => tecnicosPorDisponibilidade(ocorrencias), [ocorrencias]);
  const [tecnicoId, setTecnicoId] = useState(ocorrencia.tecnicoId || tecnicos[0]?.id || '');
  const [resolvido, setResolvido] = useState(true);
  const [desfecho, setDesfecho] = useState('');
  const [prejuizo, setPrejuizo] = useState('');
  const [motivo, setMotivo] = useState('');
  const [erros, setErros] = useState({});

  const confirmarEncerramento = (evento) => {
    evento.preventDefault();
    const encontrados = {};
    if (desfecho.trim().length < 10) encontrados.desfecho = 'Descreva o desfecho (mínimo de 10 caracteres).';
    if (!resolvido && prejuizo.trim().length < 3) encontrados.prejuizo = 'Informe o prejuízo ou impacto.';
    setErros(encontrados);
    if (Object.keys(encontrados).length) return;

    encerrar(ocorrencia.id, { resolvido, desfecho: desfecho.trim(), prejuizo: prejuizo.trim() });
    onFeito(resolvido ? 'Ocorrência encerrada com sucesso.' : 'Ocorrência encerrada como não resolvida.');
  };

  const confirmarCancelamento = (evento) => {
    evento.preventDefault();
    if (motivo.trim().length < 5) {
      setErros({ motivo: 'Informe o motivo do cancelamento (mínimo de 5 caracteres).' });
      return;
    }
    if (!window.confirm(`Cancelar a ocorrência ${ocorrencia.id}? Ela sai da fila e não poderá ser reaberta.`))
      return;
    cancelar(ocorrencia.id, motivo.trim());
    onFeito('Ocorrência cancelada.');
  };

  return (
    <Painel aria-labelledby="titulo-tratamento">
      <PainelTitulo id="titulo-tratamento">Tratamento</PainelTitulo>

      {acesso.podeAssumir(ocorrencia) && (
        <Secao>
          <Dica>Este chamado está sem técnico. Ao assumir, ele entra na sua fila.</Dica>
          <Acoes>
            <Botao
              type="button"
              onClick={() => {
                designar(ocorrencia.id, acesso.tecnicoId);
                onFeito(`Chamado assumido por ${acesso.tecnico?.nome}.`);
              }}
            >
              Assumir chamado
            </Botao>
          </Acoes>
        </Secao>
      )}

      {!acesso.admin && acesso.podeAtender(ocorrencia) && ocorrencia.status === STATUS.ABERTO && (
        <Secao>
          <Acoes>
            <Botao
              type="button"
              onClick={() => {
                iniciar(ocorrencia.id);
                onFeito('Atendimento iniciado.');
              }}
            >
              Iniciar atendimento
            </Botao>
          </Acoes>
        </Secao>
      )}

      {acesso.podeDesignar() && (
        <Secao>
          <Campo>
            <Rotulo htmlFor="tecnico">{ocorrencia.tecnicoId ? 'Trocar técnico' : 'Designar técnico'}</Rotulo>
            <Selecao id="tecnico" value={tecnicoId} onChange={(e) => setTecnicoId(e.target.value)}>
              {tecnicos.map((t, indice) => (
                <option key={t.id} value={t.id}>
                  {t.nome} · {t.emAberto} ativo(s){indice === 0 ? ' · sugerido' : ''}
                </option>
              ))}
            </Selecao>
            <Dica>Ordenado pela menor carga atual e, no empate, pela maior taxa de sucesso.</Dica>
          </Campo>
          <Acoes>
            <BotaoSecundario
              type="button"
              disabled={!tecnicoId || tecnicoId === ocorrencia.tecnicoId}
              onClick={() => {
                designar(ocorrencia.id, tecnicoId);
                onFeito(`Técnico designado: ${buscarFuncionario(tecnicoId)?.nome}.`);
              }}
            >
              {ocorrencia.tecnicoId ? 'Trocar técnico' : 'Designar técnico'}
            </BotaoSecundario>
            {ocorrencia.status === STATUS.ABERTO && (
              <Botao
                type="button"
                disabled={!ocorrencia.tecnicoId}
                onClick={() => {
                  iniciar(ocorrencia.id);
                  onFeito('Atendimento iniciado.');
                }}
              >
                Iniciar atendimento
              </Botao>
            )}
          </Acoes>
        </Secao>
      )}

      {acesso.podeAtender(ocorrencia) && (
        <Secao as="form" onSubmit={confirmarEncerramento} noValidate>
          <Campo role="group" aria-labelledby="rotulo-resultado">
            <Rotulo as="span" id="rotulo-resultado">
              Encerrar ocorrência
            </Rotulo>
            <GrupoOpcoes>
              <Opcao
                type="button"
                $ativa={resolvido}
                aria-pressed={resolvido}
                onClick={() => setResolvido(true)}
                $cor={statusCores[STATUS.CONCLUIDO].color}
                $fundo={statusCores[STATUS.CONCLUIDO].soft}
              >
                Resolvida
              </Opcao>
              <Opcao
                type="button"
                $ativa={!resolvido}
                aria-pressed={!resolvido}
                onClick={() => setResolvido(false)}
                $cor={statusCores[STATUS.NAO_RESOLVIDO].color}
                $fundo={statusCores[STATUS.NAO_RESOLVIDO].soft}
              >
                Não resolvida
              </Opcao>
            </GrupoOpcoes>
          </Campo>

          <Campo>
            <Rotulo htmlFor="desfecho">Desfecho</Rotulo>
            <AreaTexto
              id="desfecho"
              value={desfecho}
              onChange={(e) => setDesfecho(e.target.value)}
              placeholder="O que foi feito e em que estado o equipamento ficou?"
              $erro={!!erros.desfecho}
              aria-invalid={!!erros.desfecho}
            />
            {erros.desfecho && <Erro>{erros.desfecho}</Erro>}
          </Campo>

          {!resolvido && (
            <Campo>
              <Rotulo htmlFor="prejuizo">Prejuízo ou impacto</Rotulo>
              <Entrada
                id="prejuizo"
                value={prejuizo}
                onChange={(e) => setPrejuizo(e.target.value)}
                placeholder="Ex.: Equipamento parado, peça danificada"
                $erro={!!erros.prejuizo}
                aria-invalid={!!erros.prejuizo}
              />
              {erros.prejuizo && <Erro>{erros.prejuizo}</Erro>}
            </Campo>
          )}

          <Acoes>
            <Botao type="submit" disabled={!ocorrencia.tecnicoId}>
              Encerrar ocorrência
            </Botao>
          </Acoes>
          {!ocorrencia.tecnicoId && <Dica>Designe um técnico antes de iniciar ou encerrar.</Dica>}
        </Secao>
      )}

      {acesso.podeCorrigirOuCancelar(ocorrencia) && (
        <Secao as="form" onSubmit={confirmarCancelamento} noValidate>
          <Rotulo as="span">Corrigir ou cancelar</Rotulo>
          <Dica>
            Use a correção para ajustar dados registrados errado. Cancele apenas registros indevidos
            (duplicados ou abertos por engano): eles saem da fila e das métricas.
          </Dica>
          <Acoes>
            <BotaoSecundario type="button" onClick={onEditar}>
              Corrigir dados
            </BotaoSecundario>
          </Acoes>
          <Campo>
            <Rotulo htmlFor="motivo">Motivo do cancelamento</Rotulo>
            <Entrada
              id="motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ex.: Duplicado do chamado OC-0587"
              $erro={!!erros.motivo}
              aria-invalid={!!erros.motivo}
            />
            {erros.motivo && <Erro>{erros.motivo}</Erro>}
          </Campo>
          <Acoes>
            <BotaoPerigo type="submit">Cancelar ocorrência</BotaoPerigo>
          </Acoes>
        </Secao>
      )}
    </Painel>
  );
}

export default function DetalheOcorrencia() {
  const { id } = useParams();
  const { state } = useLocation();
  const { ocorrencias, buscar, editar } = useOcorrencias();
  const acesso = useAcesso();
  const [mensagem, setMensagem] = useState(state?.criada ? `Ocorrência ${id} registrada.` : '');
  const [editando, setEditando] = useState(false);
  const ocorrencia = buscar(id);
  const grupos = useMemo(() => falhasRecentesPorEquipamento(ocorrencias), [ocorrencias]);

  if (!ocorrencia || !acesso.podeVer(ocorrencia)) {
    return (
      <Pagina>
        <div className="container">
          <Voltar as={Link} to={acesso.paginaInicial}>
            ← Voltar
          </Voltar>
          <PageTitle>{ocorrencia ? 'Sem acesso a esta ocorrência' : 'Ocorrência não encontrada'}</PageTitle>
          <PageSub>
            {ocorrencia
              ? `O chamado ${id} está designado a outro técnico.`
              : `Não existe ocorrência com o código ${id}.`}
          </PageSub>
        </div>
      </Pagina>
    );
  }

  const tipo = tiposOcorrencia[ocorrencia.tipo];
  const nivel = niveisUrgencia[ocorrencia.urgencia];
  const status = statusCores[ocorrencia.status];
  const tecnico = buscarFuncionario(ocorrencia.tecnicoId);
  const ativa = estaAtiva(ocorrencia);
  const reincidencia = reincidenciaDe(ocorrencia, grupos);
  const outrasDoEquipamento = (grupos.get(chaveEquipamento(ocorrencia)) || [])
    .filter((o) => o.id !== ocorrencia.id)
    .sort((a, b) => b.abertura.localeCompare(a.abertura));
  const voltarPara = !acesso.admin
    ? '/meus-chamados'
    : ocorrencia.status === STATUS.CONCLUIDO
      ? '/historico'
      : ocorrencia.status === STATUS.NAO_RESOLVIDO
        ? '/falhas'
        : '/';
  // Painel de tratamento só aparece se houver alguma ação permitida para este perfil.
  const mostrarTratamento =
    ativa && (acesso.admin || acesso.podeAssumir(ocorrencia) || acesso.podeAtender(ocorrencia));

  const salvarEdicao = (dados) => {
    editar(ocorrencia.id, dados);
    setEditando(false);
    setMensagem('Dados da ocorrência corrigidos.');
  };

  return (
    <Pagina $larga>
      <div className="container">
        <Voltar as={Link} to={voltarPara}>
          ← Voltar
        </Voltar>
        <PageTitle>{ocorrencia.titulo}</PageTitle>
        <PageSub>
          {ocorrencia.id} · {ocorrencia.endereco}
        </PageSub>

        <Selos>
          <Alertas sla={ativa ? situacaoSla(ocorrencia) : null} reincidencia={reincidencia} detalhado />
        </Selos>

        <Aviso role="status" aria-live="polite">
          {mensagem && <span>{mensagem}</span>}
        </Aviso>

        <Colunas $duas={mostrarTratamento}>
          {editando ? (
            <Painel aria-labelledby="titulo-edicao">
              <PainelTitulo id="titulo-edicao">Corrigir dados da ocorrência</PainelTitulo>
              <OcorrenciaForm
                inicial={ocorrencia}
                onEnviar={salvarEdicao}
                onDesistir={() => setEditando(false)}
                rotuloEnviar="Salvar correção"
                prefixoId="editar"
              />
            </Painel>
          ) : (
            <Painel aria-labelledby="titulo-dados">
              <PainelTitulo id="titulo-dados">Dados da ocorrência</PainelTitulo>
              <Tags>
                <Tag color={tagTipo.color} soft={tagTipo.soft} border={tagTipo.border}>
                  {tipo?.label}
                </Tag>
                <Tag color={nivel.color} soft={nivel.soft} border={nivel.border}>
                  {nivel.label}
                </Tag>
                <Tag color={status.color} soft={status.soft} border={status.border}>
                  {ocorrencia.status}
                </Tag>
              </Tags>

              <Dados>
                <Item>
                  <RotuloDado>Técnico responsável</RotuloDado>
                  <Valor>{tecnico ? tecnico.nome : 'A definir'}</Valor>
                </Item>
                <Item>
                  <RotuloDado>Andamento</RotuloDado>
                  <Valor>{andamento(ocorrencia)}</Valor>
                </Item>
                <Item>
                  <RotuloDado>Aberta em</RotuloDado>
                  <Valor>{formatarDataHora(ocorrencia.abertura)}</Valor>
                </Item>
                <Item>
                  <RotuloDado>{ativa ? 'Aberta há' : 'Tempo de atendimento'}</RotuloDado>
                  <Valor>
                    {ativa
                      ? formatarDuracao(tempoEmEspera(ocorrencia))
                      : formatarDuracao(tempoDeAtendimento(ocorrencia))}
                  </Valor>
                </Item>
                <Item>
                  <RotuloDado>Prazo (SLA)</RotuloDado>
                  <Valor>{textoSla(ocorrencia)}</Valor>
                </Item>
              </Dados>

              <Texto>
                <RotuloDado>Descrição</RotuloDado>
                <p>{ocorrencia.descricao}</p>
              </Texto>

              {ocorrencia.desfecho && (
                <Texto>
                  <RotuloDado>Desfecho</RotuloDado>
                  <p>{ocorrencia.desfecho}</p>
                  {ocorrencia.prejuizo && (
                    <>
                      <RotuloDado>Prejuízo</RotuloDado>
                      <p>{ocorrencia.prejuizo}</p>
                    </>
                  )}
                </Texto>
              )}

              {ocorrencia.motivoCancelamento && (
                <Texto>
                  <RotuloDado>Motivo do cancelamento</RotuloDado>
                  <p>{ocorrencia.motivoCancelamento}</p>
                </Texto>
              )}

              {outrasDoEquipamento.length > 0 && (
                <Texto>
                  <RotuloDado>
                    Outras falhas deste equipamento nos últimos {REINCIDENCIA.dias} dias
                  </RotuloDado>
                  <ListaSimples>
                    {outrasDoEquipamento.map((o) => (
                      <li key={o.id}>
                        {acesso.podeVer(o) ? <Link to={`/ocorrencias/${o.id}`}>{o.id}</Link> : o.id} ·{' '}
                        {formatarDataHora(o.abertura)} · {tiposOcorrencia[o.tipo].label} · {o.status}
                      </li>
                    ))}
                  </ListaSimples>
                </Texto>
              )}

              <Texto>
                <RotuloDado>Linha do tempo</RotuloDado>
                <LinhaDoTempo ocorrencia={ocorrencia} tecnico={tecnico} />
              </Texto>
            </Painel>
          )}

          {mostrarTratamento && (
            <Tratamento
              key={ocorrencia.id}
              ocorrencia={ocorrencia}
              onFeito={setMensagem}
              onEditar={() => {
                setEditando(true);
                setMensagem('');
              }}
            />
          )}
        </Colunas>
      </div>
    </Pagina>
  );
}
