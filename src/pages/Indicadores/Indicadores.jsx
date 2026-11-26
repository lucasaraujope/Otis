import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Tag from '../../components/Tag/Tag.jsx';
import { BotaoSecundario, Painel, PainelTitulo } from '../../components/ui/styles.js';
import { useOcorrencias } from '../../store/OcorrenciasContext.jsx';
import { niveisUrgencia, REINCIDENCIA, SLA_HORAS, tiposOcorrencia } from '../../theme/colors.js';
import {
  equipamentosReincidentes,
  formatarDataHora,
  formatarDuracao,
  formatarNumero,
  indicadores,
  tecnicosPorDisponibilidade,
} from '../../utils/ocorrencias.js';
import { PageHead, PageTitle, PageSub } from '../ChamadosEmAndamento/styles.js';
import {
  Pagina,
  Kpis,
  Kpi,
  KpiRotulo,
  KpiValor,
  KpiNota,
  Grade,
  Rolagem,
  Tabela,
  Barra,
  Rodape,
  Endereco,
} from './styles.js';

const formatarPercentual = new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 0 });
const pct = (v) => (v == null ? '—' : formatarPercentual.format(v));

export default function Indicadores() {
  const { ocorrencias, restaurar } = useOcorrencias();
  const dados = useMemo(() => indicadores(ocorrencias), [ocorrencias]);
  const tecnicos = useMemo(() => tecnicosPorDisponibilidade(ocorrencias), [ocorrencias]);
  const reincidentes = useMemo(() => equipamentosReincidentes(ocorrencias), [ocorrencias]);
  const maiorTipo = Math.max(1, ...dados.porTipo.map((t) => t.total));

  const confirmarRestauracao = () => {
    if (window.confirm('Restaurar os dados de exemplo? As ocorrências registradas neste navegador serão apagadas.')) {
      restaurar();
    }
  };

  return (
    <Pagina>
      <div className="container">
        <PageHead>
          <div>
            <PageTitle>Indicadores</PageTitle>
            <PageSub>
              Calculados a partir de {formatarNumero.format(dados.total)} ocorrências registradas na base
              {dados.canceladas > 0 && ` (${dados.canceladas} canceladas, fora das métricas de resultado)`}.
            </PageSub>
          </div>
        </PageHead>

        <Kpis>
          <Kpi>
            <KpiRotulo>Chamados ativos</KpiRotulo>
            <KpiValor>{formatarNumero.format(dados.ativas)}</KpiValor>
            <KpiNota>abertos ou em andamento</KpiNota>
          </Kpi>
          <Kpi $alerta={dados.extremasAtivas > 0}>
            <KpiRotulo>Urgência extrema ativa</KpiRotulo>
            <KpiValor>{formatarNumero.format(dados.extremasAtivas)}</KpiValor>
            <KpiNota>prioridade máxima de despacho</KpiNota>
          </Kpi>
          <Kpi $alerta={dados.semTecnico > 0}>
            <KpiRotulo>Sem técnico</KpiRotulo>
            <KpiValor>{formatarNumero.format(dados.semTecnico)}</KpiValor>
            <KpiNota>aguardando designação</KpiNota>
          </Kpi>
          <Kpi $alerta={dados.foraDoSla > 0}>
            <KpiRotulo>Ativos fora do SLA</KpiRotulo>
            <KpiValor>{formatarNumero.format(dados.foraDoSla)}</KpiValor>
            <KpiNota>prazo da urgência já vencido</KpiNota>
          </Kpi>
          <Kpi>
            <KpiRotulo>Cumprimento do SLA</KpiRotulo>
            <KpiValor>{pct(dados.cumprimentoSla)}</KpiValor>
            <KpiNota>encerradas dentro do prazo</KpiNota>
          </Kpi>
          <Kpi $alerta={reincidentes.length > 0}>
            <KpiRotulo>Equipamentos reincidentes</KpiRotulo>
            <KpiValor>{reincidentes.length}</KpiValor>
            <KpiNota>{REINCIDENCIA.minimo}+ falhas em {REINCIDENCIA.dias} dias</KpiNota>
          </Kpi>
          <Kpi>
            <KpiRotulo>Taxa de resolução</KpiRotulo>
            <KpiValor>{pct(dados.taxaSucesso)}</KpiValor>
            <KpiNota>de {formatarNumero.format(dados.encerradas)} encerradas</KpiNota>
          </Kpi>
          <Kpi>
            <KpiRotulo>Tempo médio de atendimento</KpiRotulo>
            <KpiValor>{formatarDuracao(dados.tempoMedio)}</KpiValor>
            <KpiNota>da abertura ao encerramento</KpiNota>
          </Kpi>
        </Kpis>

        <Grade>
          <Painel aria-labelledby="titulo-tipos">
            <PainelTitulo id="titulo-tipos">Ocorrências por tipo</PainelTitulo>
            <Rolagem>
            <Tabela>
              <thead>
                <tr>
                  <th scope="col">Tipo</th>
                  <th scope="col">Total</th>
                  <th scope="col" className="num">Ativas</th>
                  <th scope="col" className="num">Resolução</th>
                  <th scope="col" className="num">Tempo médio</th>
                </tr>
              </thead>
              <tbody>
                {dados.porTipo.map((linha) => (
                  <tr key={linha.tipo}>
                    <th scope="row">{tiposOcorrencia[linha.tipo].label}</th>
                    <td className="barra">
                      <Barra
                        style={{ '--largura': `${(linha.total / maiorTipo) * 100}%` }}
                        title={`${tiposOcorrencia[linha.tipo].label}: ${formatarNumero.format(linha.total)} ocorrências`}
                      >
                        <span aria-hidden="true" />
                        <strong>{formatarNumero.format(linha.total)}</strong>
                      </Barra>
                    </td>
                    <td className="num">{linha.ativas}</td>
                    <td className="num">{pct(linha.taxaSucesso)}</td>
                    <td className="num">{formatarDuracao(linha.tempoMedio)}</td>
                  </tr>
                ))}
              </tbody>
            </Tabela>
            </Rolagem>
          </Painel>

          <Painel aria-labelledby="titulo-urgencia">
            <PainelTitulo id="titulo-urgencia">Tempo de resposta por urgência</PainelTitulo>
            <Rolagem>
            <Tabela>
              <thead>
                <tr>
                  <th scope="col">Urgência</th>
                  <th scope="col" className="num">SLA</th>
                  <th scope="col" className="num">Dentro do SLA</th>
                  <th scope="col" className="num">Até iniciar</th>
                  <th scope="col" className="num">Até encerrar</th>
                </tr>
              </thead>
              <tbody>
                {dados.porUrgencia.map((linha) => {
                  const nivel = niveisUrgencia[linha.urgencia];
                  return (
                    <tr key={linha.urgencia}>
                      <th scope="row">
                        <Tag color={nivel.color} soft={nivel.soft} border={nivel.border}>{nivel.label}</Tag>
                      </th>
                      <td className="num">{SLA_HORAS[linha.urgencia]} h</td>
                      <td className="num" title={`${formatarNumero.format(linha.encerradas)} encerradas`}>
                        {pct(linha.cumprimentoSla)}
                      </td>
                      <td className="num">{formatarDuracao(linha.ateInicio)}</td>
                      <td className="num">{formatarDuracao(linha.tempoMedio)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Tabela>
            </Rolagem>
          </Painel>
        </Grade>

        <Painel aria-labelledby="titulo-reincidentes">
          <PainelTitulo id="titulo-reincidentes">
            Equipamentos reincidentes · últimos {REINCIDENCIA.dias} dias
          </PainelTitulo>
          {reincidentes.length ? (
            <Rolagem>
              <Tabela>
                <thead>
                  <tr>
                    <th scope="col">Equipamento</th>
                    <th scope="col" className="num">Falhas</th>
                    <th scope="col" className="num">Não resolvidas</th>
                    <th scope="col" className="num">Ativas agora</th>
                    <th scope="col" className="num">Última ocorrência</th>
                  </tr>
                </thead>
                <tbody>
                  {reincidentes.map((r) => (
                    <tr key={r.titulo}>
                      <th scope="row">
                        {r.titulo}
                        <Endereco>{r.endereco}</Endereco>
                      </th>
                      <td className="num">{r.total}</td>
                      <td className="num">{r.naoResolvidas}</td>
                      <td className="num">{r.ativas}</td>
                      <td className="num">
                        <Link to={`/ocorrencias/${r.ultima.id}`}>{r.ultima.id}</Link> ·{' '}
                        {formatarDataHora(r.ultima.abertura)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Tabela>
            </Rolagem>
          ) : (
            <KpiNota>Nenhum equipamento com {REINCIDENCIA.minimo} ou mais falhas no período.</KpiNota>
          )}
        </Painel>

        <Painel aria-labelledby="titulo-equipe">
          <PainelTitulo id="titulo-equipe">Carga e desempenho da equipe</PainelTitulo>
          <Rolagem>
            <Tabela>
            <thead>
              <tr>
                <th scope="col">Técnico</th>
                <th scope="col" className="num">Ativos agora</th>
                <th scope="col" className="num">Encerrados</th>
                <th scope="col" className="num">Resolução</th>
                <th scope="col" className="num">Tempo médio</th>
              </tr>
            </thead>
            <tbody>
              {tecnicos.map((t) => (
                <tr key={t.id}>
                  <th scope="row">{t.nome}</th>
                  <td className="num">{t.emAberto}</td>
                  <td className="num">{formatarNumero.format(t.atendidos)}</td>
                  <td className="num">{pct(t.taxaSucesso)}</td>
                  <td className="num">{formatarDuracao(t.tempoMedio)}</td>
                </tr>
              ))}
            </tbody>
          </Tabela>
            </Rolagem>
        </Painel>

        <Rodape>
          <span>
            Os dados ficam salvos neste navegador (localStorage). A base inicial é fictícia, para
            demonstração.
          </span>
          <BotaoSecundario type="button" onClick={confirmarRestauracao}>
            Restaurar dados de exemplo
          </BotaoSecundario>
        </Rodape>
      </div>
    </Pagina>
  );
}
