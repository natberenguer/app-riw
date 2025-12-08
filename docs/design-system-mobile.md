# Design System Mobile – RIW (resumo)

Guia rápido para manter a identidade do RIW no app mobile.

## Cores-chave
- Purple `#8B5CF6` — primária para CTAs e acentos.
- Blue `#3B82F6` — apoio em gradientes e elementos interativos.
- Pink `#EC4899` — destaques e chamadas secundárias.
- Cyan `#22D3EE` e Teal `#2DD4BF` — acentos auxiliares.
- Background Dark `#05060F` (fundo padrão) e Background Purple Dark `#140925` (alternativo).
- Semânticas (dark): Foreground `#F8F9FA`; Accent `rgba(139,92,246,0.15)`; Border `rgba(139,92,246,0.2)`; Muted `#33363D`; Destructive `#991B1B`.

## Gradientes essenciais
- Prismatic: `rgba(139,92,246,0.1)` → `rgba(59,130,246,0.1)` → `rgba(236,72,153,0.1)` em 135° (start 0,0 → end 1,1).
- Background Dark: `#0d0e14` → `#08090d` → `#000000` em 135°, opcional vinheta sutil.

## Tipografia
- Fonte: Poppins (300, 400, 500, 600, 700).
- Body: 14px, weight 300, line-height 1.6, letter-spacing -0.025em.
- Headings: weight 300, line-height 1.1–1.2, letter-spacing -0.02em; tamanhos usuais 30/20/18/14px.

### Tokens TS para RN/Expo (exemplo)
```typescript
export const colors = {
  purple: '#8B5CF6',
  blue: '#3B82F6',
  pink: '#EC4899',
  cyan: '#22D3EE',
  teal: '#2DD4BF',
  background: '#05060F',
  backgroundAlt: '#140925',
  foreground: '#F8F9FA',
  accent: 'rgba(139,92,246,0.15)',
  border: 'rgba(139,92,246,0.2)',
  muted: '#33363D',
  destructive: '#991B1B',
};

export const gradients = {
  prismatic: [
    'rgba(139,92,246,0.1)',
    'rgba(59,130,246,0.1)',
    'rgba(236,72,153,0.1)',
  ],
  backgroundDark: ['#0d0e14', '#08090d', '#000000'],
  angle: 135,
};

export const typography = {
  family: 'Poppins',
  weight: { light: '300', regular: '400', medium: '500', semiBold: '600', bold: '700' },
  size: { base: 14, lg: 18, xl: 20, '3xl': 30 },
  lineHeight: { tight: 1.1, normal: 1.2, relaxed: 1.6 },
  letter: { tighter: -0.025, tight: -0.02 },
};
```

## Textura granular (noise)
- Overlay repetido de 220x220px, opacidade ~0.25.
- Aplicar por cima de heros/cards; evitar sobre texto fino ou listas longas.
- Em RN, preferir PNG repetido com `position: 'absolute'` e `resizeMode: 'repeat'`; SVG `feTurbulence`/`fractalNoise` é possível, mas custa performance.
- Desabilitar em dispositivos de baixa performance.

## Logo
- Use apenas arquivos oficiais da marca (vetor/PNG) mantendo proporção.
- Preferir versão clara sobre fundos escuros ou gradiente suave; garantir contraste AA.
- Margem de segurança: ~0.5x da altura do logo em todas as direções.
- Não aplicar textura de noise diretamente sobre a marca.

## Plano de aplicação nas páginas
- **Inventário e tokens**: mapear telas e componentes; aplicar tokens de cor/tipografia; criar tema base (dark) no provider global.
- **Fundos e gradientes**: usar fundo `#05060F` ou gradiente Background Dark em telas principais; aplicar Prismatic em heros e CTAs.
- **Componentes base**: atualizar Button, Card, Input, AppBar com cores semânticas, estados de foco/press e bordas `rgba(139,92,246,0.2)`.
- **Tipografia**: setar família Poppins no root; aplicar tamanhos 30/20/18/14 conforme hierarquia; revisar pesos.
- **Textura granular**: aplicar overlay em heros/banners/cards premium; desabilitar em listas longas.
- **Logo**: revisar uso do logo em splash, header e landing; garantir margem e contraste.
- **QA visual**: checar contraste AA, estados interativos e performance do overlay em devices de entrada.

## Checklist rápido
- [ ] Provider de tema com tokens de cor e tipografia aplicados.
- [ ] Buttons e CTAs usando Purple/Blue + estados.
- [ ] Cards/listas com fundo dark, borda semântica, tipografia correta.
- [ ] Gradiente Prismatic em heros; Background Dark em telas principais.
- [ ] Textura granular aplicada apenas onde agrega; desligada em low-end.
- [ ] Logo com margem/contraste corretos; sem noise sobreposto.

