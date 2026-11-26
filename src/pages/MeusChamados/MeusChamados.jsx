import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ChamadoCard from '../../components/ChamadoCard/ChamadoCard.jsx';
import Alertas from '../../components/Alertas/Alertas.jsx';
import Tag from '../../components/Tag/Tag.jsx';
import { BotaoSecundario, Painel, PainelTitulo } from '../../components/ui/styles.js';
import { useOcorrencias } from '../../store/OcorrenciasContext.jsx';
import { useAcesso } from '../../store/AcessoContext.jsx';
import { niveisUrgencia, STATUS, tiposOcorrencia } from '../../theme/colors.js';
import {
  estaAtiva,
  estaEncerrada,
  falhasRecentesPorEquipamento,
  formatarDuracao,
  ordenarPorPrioridade,
  reincidenciaDe,
  situacaoSla,
  tempoEmEspera,
} from '../../utils/ocorrencias.js';
import { PageHead, PageTitle, PageSub } from '../ChamadosEmAndamento/styles.js';
import { Kpis, Kpi, KpiRotulo, KpiValor } from '../Indicadores/styles.js';
import {
  Pagina,
  Colunas,
  Cards,
  Vazio,
  Disponivel,
  DisponivelTopo,
  DisponivelTitulo,
  DisponivelSub,
  SelosLinha,
} from './styles.js';

const formatarPercentual = new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 0 });

// Recria a tela ao trocar de técnico, para não carregar mensagens do anterior.
export default function MeusChamados() {
  const { tecnicoId } = useAcesso();
  return <ConteudoMeusChamados key={tecnicoId} />;
}

function ConteudoMeusChamados() {
  const { ocorrencias, designar } = useOcorrencias();
  // O técnico vem do perfil de acesso escolhido no cabeçalho.
  const { tecnicoId, tecnico } = useAcesso();
  const [mensagem, setMensagem] = useState('');

  const grupos = useMemo(() => falhasRecentesPorEquipamento(ocorrencias), [ocorrencias]);
  const ativas = useMemo(() => ordenarPorPrioridade(ocorrencias.filter(estaAtiva)), [ocorrencias]);
  const minhaFila = ativas.filter((o) => o.tecnicoId === tecnicoId);
  const disponiveis = ativas.filter((o) => !o.tecnicoId);

  const corte = Date.now() - 30 * 86400000;
  const encerradas30 = ocorrencias.filter(
    (o) => o.tecnicoId === tecnicoId && estaEncerrada(o) && new Date(o.encerramento) >= corte
  );
  const resolvidas30 = encerradas30.filter((o) => o.status === STATUS.CONCLUIDO).length;
  const foraDoSla = minhaFila.filter((o) => situacaoSla(o).situacao === 'estourado').length;

  return (
    <Pagina>
      <div className="container">
        <PageHead>
          <div>
            <PageTitle>Meus chamados</PageTitle>
            <PageSub>
              {tecnico?.nome} · sua fila em ordem de prioridade e chamados disponíveis para assumir.
            </PageSub>
          </div>
        </PageHead>

        <Kpis>
          <Kpi>
            <KpiRotulo>Na minha fila</KpiRotulo>
            <KpiValor>{minhaFila.length}</KpiValor>
          </Kpi>
          <Kpi $alerta={foraDoSla > 0}>
            <KpiRotulo>Fora do SLA</KpiRotulo>
            <KpiValor>{foraDoSla}</KpiValor>
          </Kpi>
          <Kpi>
            <KpiRotulo>Encerrados em 30 dias</KpiRotulo>
            <KpiValor>{encerradas30.length}</KpiValor>
          </Kpi>
          <Kpi>
            <KpiRotulo>Resolução em 30 dias</KpiRotulo>
            <KpiValor>
              {encerradas30.length ? formatarPercentual.format(resolvidas30 / encerradas30.length) : '—'}
            </KpiValor>
          </Kpi>
        </Kpis>

        <Colunas>
          <section aria-labelledby="titulo-fila">
            <PainelTitulo id="titulo-fila">Minha fila ({minhaFila.length})</PainelTitulo>
            {minhaFila.length ? (
              <Cards>
                {minhaFila.map((o) => (
                  <ChamadoCard key={o.id} chamado={o} reincidencia={reincidenciaDe(o, grupos)} />
                ))}
              </Cards>
            ) : (
              <Vazio>Nenhum chamado ativo designado para {tecnico?.nome}.</Vazio>
            )}
          </section>

          <Painel aria-labelledby="titulo-disponiveis">
            <PainelTitulo id="titulo-disponiveis">Sem técnico ({disponiveis.length})</PainelTitulo>
            <div role="status" aria-live="polite">
              {mensagem && <PageSub as="p">{mensagem}</PageSub>}
            </div>
            {disponiveis.length ? (
              disponiveis.map((o) => {
                const nivel = niveisUrgencia[o.urgencia];
                return (
                  <Disponivel key={o.id}>
                    <DisponivelTopo>
                      <div>
                        <DisponivelTitulo as={Link} to={`/ocorrencias/${o.id}`}>
                          {o.titulo}
                        </DisponivelTitulo>
                        <DisponivelSub>
                          {tiposOcorrencia[o.tipo].label} · aberto há {formatarDuracao(tempoEmEspera(o))}
                        </DisponivelSub>
                      </div>
                      <BotaoSecundario
                        type="button"
                        onClick={() => {
                          designar(o.id, tecnicoId);
                          setMensagem(`${o.id} assumido por ${tecnico?.nome}.`);
                        }}
                      >
                        Assumir
                      </BotaoSecundario>
                    </DisponivelTopo>
                    <SelosLinha>
                      <Tag color={nivel.color} soft={nivel.soft} border={nivel.border}>{nivel.label}</Tag>
                      <Alertas sla={situacaoSla(o)} reincidencia={reincidenciaDe(o, grupos)} />
                    </SelosLinha>
                  </Disponivel>
                );
              })
            ) : (
              <Vazio>Todos os chamados ativos têm técnico designado.</Vazio>
            )}
          </Painel>
        </Colunas>
      </div>
    </Pagina>
  );
}
