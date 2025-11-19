export const RAG_CONTENT = `
==Start of OCR for page 1==
Interconexiones Eléctricas: Costos, Beneficios
y Regulación
Análisis Comparativo de Europa, Sudamérica y Asia
11 de noviembre de 2025
==End of OCR for page 1==
==Start of OCR for page 2==
Índice general
Resumen Ejecutivo
3
1. Principios Fundamentales de la Asignación de Costos y Beneficios Trans-
fronterizos
4
1.1. Introducción: El Dilema de la Cooperación en Infraestructura Transfronteriza
1.2. Modelos Económicos y de Teoría de Juegos para la Cooperación
4
5
1.2.1. La Teoría de Juegos Cooperativos (TGC) como marco axiomático
1.2.2. Estabilidad de las coaliciones
5
5
5
5
5
6
6
1.2.3. Limitaciones prácticas
1.3. Estructuras de precios y tarifas para la recuperación de la inversión
1.3.1. Tarifas de dos partes
1.3.2. Métodos de «postage stamp» y sensibilidad
1.3.3. Precios basados en costos marginales
1.4. El rol de la regulación en la alineación de incentivos y la mitigación de
riesgos
1.4.1. Regulación de incentivos
1.4.2. Gestión de la incertidumbre
1.5. Formulaciones matemáticas clave
1.5.1. 1.5.1. Valor de Shapley (Teoría de Juegos Cooperativos)
1.5.2. 1.5.2. Análisis Costo-Beneficio (CBA) del modelo europeo
1.5.3. 1.5.3. Costo de servicio del Tratado de Itaipú (Anexo C)
1.5.4. 1.5.4. Despacho económico coordinado del SINEA (MAERCP)
1.5.5. 1.5.5. Estructura de ingresos en un PPA take-or-pay
2. El Modelo Integrado Europeo: Regulación, Metodología y Aplicación
2.1. El Marco Regulatorio de la UE: Proyectos de Interés Común (PCI) y la
Asignación de Costos Transfronterizos (CBCA)
6
6
6
6
6
7
7
7
7
9
9
2.2. Análisis Detallado: la Metodología de Análisis Costo-Beneficio (CBA) de
ENTSO-E
11
2.3. Caso de Aplicación: la Cooperación Energética de los Mares del Norte
(NSEC) y Proyectos Híbridos Offshore
12
3. Modelos Bilaterales y Subregionales en Sudamérica
14
3.1. Proyectos Hidroeléctricos Binacionales: El Modelo Financiero de Itaipú
(Brasil-Paraguay)
14
3.2. Integración Subregional: El Sistema de Interconexión Eléctrica Andina (SINEA)
3.3. Acuerdos Bilaterales Específicos: La Interconexión Colombia-Panamá
3.4. Integración en Centroamérica: El Proyecto SIEPAC
16
16
17
1
==End of OCR for page 2==
==Start of OCR for page 3==
4. Marcos de Cooperación Emergentes en Asia
19
4.1. La Red Eléctrica de la ASEAN (APG): Ambición, Financiación y Desafíos 19
4.2. Comercio Eléctrico Subregional: GMS y BBIN
20
4.3. Caso de Aplicación: PPA en Proyectos de Exportación (Laos-Tailandia) .
21
5. Análisis Comparativo y Síntesis Global
23
5.1. Filosofías de Asignación: del Costo de Servicio al Beneficio Social
5.2. Gobernanza y Soberanía: regulación supranacional vs. acuerdos nacionales
5.3. Madurez del mercado y enfoque de la inversión
23
23
24
6. Recomendaciones Estratégicas y Perspectivas Futuras
26
6.1. Mejores prácticas para la estructuración de acuerdos de inversión
6.2. Recomendaciones de política para fomentar la cooperación transfronteriza 27
6.3. Tendencias emergentes y conclusión final
26
27
2
==End of OCR for page 3==
==Start of OCR for page 4==
Resumen Ejecutivo
Las interconexiones eléctricas transfronterizas son pilares fundamentales para la se-
guridad energética, la eficiencia de los mercados y la transición hacia sistemas eléctricos
descarbonizados a nivel global. Sin embargo, su desarrollo se ve frecuentemente obsta-
culizado por un desafío intrínseco: la distribución asimétrica de sus costos y beneficios
entre los países participantes. La viabilidad de estos proyectos de infraestructura, que
requieren inversiones masivas y una cooperación política sostenida, depende críticamente
de la existencia de mecanismos de asignación de costos y beneficios que sean percibidos
como justos, eficientes y estables.
Este informe presenta un análisis exhaustivo y comparativo de dichos mecanismos,
examinando su fundamentación teórica, su instrumentación regulatoria y su aplicación
práctica en tres regiones geopolíticas clave: Europa, Sudamérica y Asia.
3
==End of OCR for page 4==
==Start of OCR for page 5==
Capítulo 1
Principios Fundamentales de la
Asignación de Costos y Beneficios
Transfronterizos
1.1. Introducción: El Dilema de la Cooperación en In-
fraestructura Transfronteriza
La creciente interdependencia de los sistemas eléctricos nacionales, impulsada por
la necesidad de mejorar la seguridad del suministro, optimizar los recursos energéticos
y facilitar la integración a gran escala de fuentes de energía renovable intermitentes,
ha colocado a los proyectos de interconexión transfronteriza en el centro de la política
energética global. Estas infraestructuras críticas generan un valor colectivo significativo:
permiten que los países compartan reservas de generación, accedan a fuentes de energía
más económicas, reduzcan la volatilidad de los precios y aumenten la resiliencia general
del sistema. Sin embargo, la materialización de estos beneficios regionales se enfrenta a
un obstáculo fundamental conocido como el dilema de la cooperación.
El problema central radica en la distribución inherentemente asimétrica de los costos
y beneficios. Un país puede verse obligado a albergar la mayor parte de la infraestructura
física de una nueva línea de transmisión, con los consiguientes costos de inversión, impac-
tos ambientales y sociales, mientras que los beneficios económicos principales como la
reducción de los precios de la electricidad o el acceso a energía limpia— se acumulan en
un país vecino. Esta divergencia entre quién paga y quién se beneficia crea un desajuste de
incentivos que puede llevar a retrasos en la inversión, negociaciones fallidas y, en última
instancia, al desarrollo subóptimo de la red a nivel regional.
La literatura académica y los informes de política coinciden en que la ausencia de
mecanismos de asignación de costos y beneficios que sean percibidos como justos, trans-
parentes y eficientes constituye una de las barreras más significativas para la inversión
en interconexiones. Por lo tanto, el objetivo primordial de estos mecanismos no es sim-
plemente dividir una factura, sino diseñar un marco de incentivos que alinee los intereses
soberanos de cada nación con el objetivo de maximizar el bienestar social y económico
de la región en su conjunto. Se trata de transformar un juego de suma cero potencial en
un resultado de suma positiva para todos los participantes, garantizando que cada país
obtenga un beneficio neto que justifique su participación y su inversión en el proyecto
cooperativo.
4
==End of OCR for page 5==
==Start of OCR for page 6==
1.2. Modelos Económicos y de Teoría de Juegos para
la Cooperación
1.2.1. La Teoría de Juegos Cooperativos (TGC) como marco
axiomático
A diferencia de la teoría de juegos no cooperativos, que se centra en estrategias indi-
viduales, la TGC analiza cómo coaliciones de países pueden cooperar para generar valor
conjunto y cómo repartirlo. Su aplicación a las interconexiones eléctricas parte de la pre-
misa de que el valor de una red regional integrada supera a la suma de sistemas nacionales
aislados.
Dentro de la TGC, el Valor de Shapley es el concepto de solución más citado por
su fundamento axiomático de equidad: asigna a cada país un pago igual a su contribución
marginal promedio al valor total generado por la coalición, preservando propiedades como
eficiencia y simetría. Su uso teórico se ha explorado en contextos como la red offshore del
Mar del Norte y la subregión BBIN en Asia.
1.2.2. Estabilidad de las coaliciones
Un objetivo central de cualquier mecanismo de asignación es la estabilidad. La TGC
la estudia con el núcleo: una asignación está en el núcleo si ningún subconjunto de países
obtiene más beneficio escindiéndose que permaneciendo en la gran coalición. Así, los
mecanismos inspirados en TGC no solo buscan equidad, sino también robustez frente a
desviaciones estratégicas.
1.2.3. Limitaciones prácticas
La implementación directa de soluciones axiomáticas enfrenta dos desafíos: (i) com-
plejidad computacional (el cálculo del Valor de Shapley crece exponencialmente con el
número de participantes); y (ii) información imperfecta (países con incentivos a subes-
timar beneficios o inflar costos). Por ello, en la práctica se diseñan mecanismos inspira-
dos en TGC —p.ej., asignación basada en beneficios— que sean suficientemente buenos,
transparentes y políticamente aceptables.
1.3. Estructuras de precios y tarifas para la recupera-
ción de la inversión
Mientras la TGC orienta el reparto del “pastel”, las estructuras de precios determinan
cómo se pagan y recuperan los costos.
1.3.1.
Tarifas de dos partes
■ Cargo fijo (capacidad): orientado a recuperar CAPEX y OPEX fijos; suele co-
brarse según capacidad reservada o contratada, independiente del uso efectivo.
■ Cargo variable (energía): proporcional a MWh efectivamente intercambiados;
cubre costos variables (pérdidas) e incluso componentes ligados a congestión.
5
==End of OCR for page 6==
==Start of OCR for page 7==
Este enfoque permite adaptar la recuperación de costos a capacidades de pago y
patrones de uso heterogéneos entre países.
1.3.2. Métodos de «postage stamp» y sensibilidad
El método sello postal aplica un cargo uniforme sin considerar distancia ni trazado de
flujo. Para corregir ineficiencias, suele combinarse con índices de sensibilidad o factores
de reparto de flujo, ajustando el cargo según la contribución a la congestión en partes
específicas de la red.
1.3.3.
Precios basados en costos marginales
En mercados desarrollados, el precio de corto plazo iguala el costo marginal de la
última unidad. Cuando hay congestión, emergen rentas de congestión, señales del valor
de expandir transmisión. Sin embargo, por sí solas rara vez cubren la inversión total; se
requieren mecanismos de recuperación de costos fijos de largo plazo (p.ej., cargos por
capacidad o tarifas reguladas).
1.4. El rol de la regulación en la alineación de incenti-
vos y la mitigación de riesgos
La regulación fija las reglas del juego, alinea incentivos entre TSO, generadores, con-
sumidores e inversores, y gestiona riesgos de inversiones a largo plazo.
1.4.1. Regulación de incentivos
Puede, por ejemplo, permitir un retorno regulado a la transmisión pero ligando parte
de las utilidades a metas para consumidores (p.ej., reducción de congestión, mejora de
fiabilidad), evitando capturas desproporcionadas de beneficios privados frente al bienestar
social.
1.4.2. Gestión de la incertidumbre
Los beneficios se estiman ex ante y se materializan ex post. Para navegar la divergencia:
■ Modelos estocásticos: múltiples escenarios con probabilidades.
■ Mecanismos de compensación de bienestar: cláusulas que activan pagos si los
beneficios realizados caen bajo umbrales predefinidos.
1.5. Formulaciones matemáticas clave
1.5.1. 1.5.1. Valor de Shapley (Teoría de Juegos Cooperativos)
Φι(ν) = ∑ |S|! (n - |S| - 1)! [v(S U {i}) - v(S)]
(1.1)
n!
SCN\{i}
6
==End of OCR for page 7==
==Start of OCR for page 8==
donde N es el conjunto de países (|N| = n), S una coalición que no incluye a i, y v(·) la
función de valor.
1.5.2.1.5.2. Análisis Costo-Beneficio (CBA) del modelo europeo
T
T
BeneficioNetoj =
ASEWj,t
(1+r)t
ACostoPérdidasj,t
(1+r)t
t=1
t=1
con r tasa de descuento social y Tel horizonte temporal.
T
(CAPEX) CAPEX + ΣOPEX
t=1
j,t
(1+r)t
(1.2)
1.5.3. 1.5.3. Costo de servicio del Tratado de Itaipú (Anexo C)
Modelo de cobertura de costos (empresa binacional sin fines de lucro):
CostoServiciot = Rcapital + Cfinancieros + Adeuda + Royalties + Radmin + Cexplotación ± Sexplotación,t−1 + R
(1.3)
donde Rcapital es la remuneración al capital integrado; Cfinancieros y Adeuda corresponden
a intereses y amortización (eliminados tras el pago de la deuda en 2023); Royalties son
pagos por uso de recursos hídricos; Radmin el resarcimiento por administración; Cexplotación
los costos O&M; Sexplotación,t−1 el saldo de la cuenta de explotación del año previo; y Rcesión
la remuneración por energía cedida. La tarifa anual se fija para igualar exactamente el
costo del servicio.
1.5.4. 1.5.4. Despacho económico coordinado del SINEA (MAERCP)
El despacho en el Mercado Andino Eléctrico Regional de Corto Plazo (MAERCP) se
basa en la maximización del beneficio social de los intercambios, sujeto a restricciones
técnicas y de mercado.8 El problema de optimización se puede formular de la siguiente
manera:
máx ∑(pcompra Qintercambio - (Pventa + Peaje_transmisin) Qintercambio
teT
t
teT
)
(1.4)
sujeto a
1.5.5.
0 < Qintercambio < Capacidadenlace (capacidad de transmisión)
pimportacin < pgeneracin_propia (no pagar más que el costo local)
Otras restricciones operativas del sistema.
(1.5)
(1.6)
(1.7)
1.5.5. Estructura de ingresos en un PPA take-or-pay
En los PPA bilaterales, comunes en Asia, la cláusula "toma o paga"garantiza un flujo
de ingresos mínimo para el generador, asegurando la viabilidad financiera del proyecto.
La estructura de ingresos se puede representar como:
Ingreso anual = Tcapacidad + Tenergía
(1.8)
7
==End of OCR for page 8==
==Start of OCR for page 9==
Tcapacidad = Pcapacidad × Capacidad contratada
Tenergía = Penergía × máx (Energiaentregada, Energiamínima)
8
(1.9)
(1.10)
==End of OCR for page 9==
==Start of OCR for page 10==
Capítulo 2
El Modelo Integrado Europeo:
Regulación, Metodología y Aplicación
El enfoque de la Unión Europea para las interconexiones eléctricas transfronterizas
es el más estructurado e institucionalizado del mundo. Se basa en un marco regulato-
rio supranacional, una metodología de análisis estandarizada y un proceso de toma de
decisiones coordinado, diseñado para superar las barreras de inversión y promover un
mercado energético interno plenamente integrado.
2.1. El Marco Regulatorio de la UE: Proyectos de Inte-
rés Común (PCI) y la Asignación de Costos Trans-
fronterizos (CBCA)
Contexto y Base Legal
La piedra angular del marco europeo es el Reglamento sobre las orientaciones para
las infraestructuras energéticas transeuropeas (Reglamento TEN-E). La versión más re-
ciente, el Reglamento (UE) 2022/869, establece un proceso para identificar Proyectos
de Interés Común (PCI), que son proyectos de infraestructura considerados esencia-
les para alcanzar los objetivos de política energética de la UE, como la integración del
mercado, la seguridad del suministro y la sostenibilidad.
Para facilitar la implementación de estos proyectos, el reglamento introdujo el mecanis-
mo de Asignación de Costos Transfronterizos (CBCA). El propósito fundamental
del CBCA es abordar las asimetrías en la distribución de costos y beneficios que a menu-
do obstaculizan los proyectos transfronterizos.[1] Si un PCI demuestra generar beneficios
significativos para un país B, pero sus costos recaen principalmente en un país anfitrión
A, el mecanismo CBCA permite que una parte de los costos de inversión sea transferida
del país A al país B. Además, una decisión CBCA positiva es un requisito previo para
que un proyecto pueda solicitar financiación del Mecanismo “Conectar Europa" (CEF) de
la UE. [1]
Proceso de Decisión del CBCA
El proceso de CBCA está claramente definido y se inicia a petición de los promotores
del proyecto [1]:
9
==End of OCR for page 10==
==Start of OCR for page 11==
1. Solicitud de inversión: los promotores del PCI presentan una solicitud de in-
versión conjunta, que incluye una propuesta de CBCA, a todas las Autoridades
Reguladoras Nacionales (ARN) de los Estados miembros significativamente afecta-
dos.
2. Evaluación de las ARN: una vez que las ARN consideran que la solicitud está
completa y el proyecto es suficientemente maduro, inician un proceso de coordina-
ción. Tienen seis meses para llegar a una decisión coordinada sobre la asignación
de costos.
3. Intervención de ACER: si las ARN no logran un acuerdo en el plazo de seis
meses, el caso se remite a la Agencia de la Unión Europea para la Cooperación de
los Reguladores de la Energía (ACER), que toma una decisión final y vinculante
sobre la asignación de costos.
El Principio de Compensación de ACER
Para guiar las decisiones de las ARN y sus propias deliberaciones, ACER ha emitido
recomendaciones sobre buenas prácticas para el tratamiento de las solicitudes de CB-
CA. La recomendación clave, establecida inicialmente en 2015 y actualizada, propone un
enfoque "minimalista" o de compensación por daño. [2]
El principio fundamental es que se deben proporcionar compensaciones transfronte-
rizas si se considera que al menos un Estado miembro que alberga el proyecto sufre un
impacto neto negativo en al menos uno de los escenarios futuros considerados plausibles
por todas las ARN implicadas. [2] En tal caso, la asignación de costos debe diseñarse
para que el impacto en ese país se vuelva, como mínimo, neutral. Este enfoque minimiza
el número de casos en los que se requiere una transferencia de costos, centrándose en
eliminar los perjuicios directos en lugar de buscar una redistribución exhaustiva de los
beneficios positivos.
No obstante, ACER reconoce que este no es el único enfoque posible. La recomenda-
ción acepta explícitamente que los acuerdos entre ARN pueden ir más allá de la simple
compensación del impacto negativo. Se pueden justificar asignaciones de costos más am-
plias para tener en cuenta las incertidumbres en el análisis de beneficios o para corregir
diferencias "irrazonablemente” grandes en los beneficios netos entre los Estados miembros
después de la asignación de costos inicial. [2]
Desafíos en la Implementación
A pesar de la claridad del marco, su implementación práctica presenta desafíos. La
propia ENTSO-E ha advertido que el proceso CBCA, al involucrar a múltiples partes
(promotores, TSO, ARN, gobiernos), puede volverse excesivamente complejo y burocrá-
tico. Si no se gestiona con un espíritu pragmático y cooperativo, existe el riesgo de que
el mecanismo ralentice las inversiones en lugar de acelerarlas.[3]
Un análisis de las decisiones CBCA tomadas entre 2014 y 2024 revela que la transfe-
rencia real de costos a países no anfitriones ha sido muy limitada, representando menos
del 1% del CAPEX total de todos los proyectos con una decisión.[1] En muchos casos,
el objetivo principal de los promotores al solicitar un CBCA parece ser cumplir con el
requisito para acceder a las subvenciones del CEF, más que lograr una reasignación sus-
tancial de los costos de inversión. Esto sugiere que, si bien el mecanismo es funcional, su
10
==End of OCR for page 11==
==Start of OCR for page 12==
papel principal en la práctica ha sido el de un facilitador de financiación europea, más
que un instrumento de redistribución de costos a gran escala.[1]
2.2. Análisis Detallado: la Metodología de Análisis Costo-
Beneficio (CBA) de ENTSO-E
La decisión sobre cómo asignar los costos bajo el mecanismo CBCA depende de una
evaluación rigurosa y estandarizada de los beneficios que el proyecto generará. Para ello, el
marco regulatorio europeo se apoya en la metodología de Análisis Costo-Beneficio (CBA)
desarrollada por ENTSO-E.
Rol y Mandato
El Reglamento TEN-E exige a ENTSO-E que desarrolle y actualice periódicamente
una metodología armonizada a nivel de toda la Unión para el CBA de los proyectos de
infraestructura. [4] Esta metodología se utiliza para evaluar todos los proyectos de trans-
misión y almacenamiento incluidos en el Plan Decenal de Desarrollo de la Red (TYNDP),
que es el plan paneuropeo de desarrollo de la red eléctrica.[5] Los informes de ACER con-
firman que, en la mayoría de los casos, la metodología CBA de ENTSO-E es la base
utilizada para calcular los beneficios de los proyectos en las decisiones CBCA.[1] La ver-
sión más reciente y aplicable es la 4ª Guía de la Metodología CBA, aprobada por la
Comisión Europea en marzo de 2024.[6]
Indicadores de Beneficio Clave
La metodología CBA evalúa el impacto de cada proyecto a través de un conjunto de
indicadores estandarizados, diseñados para capturar beneficios en tres áreas principales:
integración del mercado, sostenibilidad y seguridad del suministro.[7] Los indicadores más
importantes se describen a continuación y se resumen en la Tabla 2.1:[6]
■ Bienestar Socioeconómico (B1): indicador central. Mide la variación del bien-
estar socioeconómico, calculada principalmente como la reducción del costo total de
generación en toda Europa. La nueva interconexión permite un despacho más efi-
ciente de la generación, utilizando centrales más baratas para satisfacer la demanda;
se monetiza directamente en euros.
■ Reducción de Emisiones de CO2 (B2): cuantifica la variación en las emisiones
de CO2 por cambios en el mix de generación inducidos por el proyecto. Se monetiza
multiplicando las toneladas evitadas por un costo social del carbono.
■ Integración de Energías Renovables (B3): mide el cambio en la energía RES
integrada o, inversamente, la reducción del curtailment. No se monetiza por sepa-
rado, pues su efecto económico ya está incluido en B1.
■ Otros indicadores: reducción de otros contaminantes (B4); pérdidas en la red
(B5); y seguridad del suministro o adecuación (B6, reducción de ENS).
11
==End of OCR for page 12==
==Start of OCR for page 13==
Indicadores de Costo
■ CAPEX (C1): costos de inversión.
■ OPEX (C2): costos de operación y mantenimiento durante la vida útil.
Indicador
B1: SEW
Cuadro 2.1: Desglose de Indicadores del CBA de ENTSO-
E (4ª Guía)
Descripción
Variación del costo to-
tal de generación (efi-
ciencia de mercado).
Método de cuantifi- Monetización
cación
Simulación paneuro- € año (millo-
pea con/sin proyecto nes).
(diferencias de costos
de combustible
operación).
y
Variación de emisiones Cambio en despacho €/tCO2.
B2: CO2
de CO2.
por tecnología en la si-
mulación.
B3: RES
Variación del curtail-
Diferencia en GWh
No monetizado
ment de renovables.
con/sin proyecto.
(incluido en B1).
B4: Otras emi- Variación de NOx,
Factores de emisión
Opcional (€ o
siones
SO2, PM.
por tecnología.
toneladas).
B5: Pérdidas
Variación de pérdidas
Flujo de carga con/sin €/MWh.
en transmisión.
proyecto.
B6: Seguridad
en escenarios de es-
(VOLL).
trés.
C1: CAPEX
Costos de inversión.
Reducción de ENS Análisis probabilístico €/MWh
(adecuación).
C2: OPEX
Estimación de inge- M∈(inversión
niería, adquisición y total).
construcción.
Operación y manteni- Costos anuales proyec- M€/año.
miento.
tados.
2.3. Caso de Aplicación: la Cooperación Energética de
los Mares del Norte (NSEC) y Proyectos Híbridos
Offshore
El desarrollo masivo de la energía eólica marina en Europa, especialmente en los
Mares del Norte, está poniendo a prueba y, a la vez, impulsando la evolución del marco
regulatorio de la UE. La escala y la complejidad de estos proyectos requieren un nivel de
cooperación sin precedentes.
12
==End of OCR for page 13==
==Start of OCR for page 14==
Contexto Estratégico
La Cooperación Energética de los Mares del Norte (NSEC) es un marco de
cooperación regional y voluntario entre nueve países y la Comisión Europea, diseñado
para facilitar el despliegue rentable de renovables offshore y promover la interconexión en
la región. [8] Los países miembros acordaron alcanzar al menos 120 GW de eólica marina
para 2030 y 300 GW para 2050. [8] Para cumplir estas metas, la planificación de red
debe evolucionar desde esquemas radiales nacionales hacia una red marina mallada e
interconectada. [8]
El Desafío de los Proyectos Híbridos
Un proyecto híbrido cumple doble función: conecta uno o más parques eólicos ma-
rinos a la red terrestre y, simultáneamente, actúa como interconector entre países.[8]
Son más eficientes en uso de espacio y capital, pero introducen desafíos regulatorios y
de reparto de costos mayores que los interconectores tradicionales. Los beneficios son
multifacéticos y difusos (RES, seguridad de suministro, eficiencia de mercado), la infra-
estructura puede ubicarse en aguas internacionales y no existe un único “país anfitrión”.
Por ello, el enfoque minimalista de ACER (centrado en compensar impactos negativos)
puede resultar insuficiente.
Principios de Reparto de Costos para Proyectos Offshore
Guias recientes de la Comisión Europea (junio 2024) y de ENTSO-E proponen un
enfoque flexible y negociado:[8]
■ Preferencia por acuerdos voluntarios: decisiones a nivel nacional con negocia-
ción directa entre países, evitando claves rígidas predefinidas.
■ Enfoque regional: marcos por cuenca marítima (p. ej., NSEC) en lugar de un
esquema paneuropeo único.
■ Consenso político como habilitador: más allá del análisis técnico, el apoyo
político regional es crítico para concretar acuerdos.
Criterios de Asignación en la Práctica
La práctica refleja esta evolución: en interconectores offshore se observa una tendencia
a apartarse del reparto 50/50. En seis de cada 10 decisiones, los costos se asignaron según
la distribución de beneficios calculada por el CBA, en vez de por geografía o reparto
igualitario. Esto contrasta con interconectores terrestres, donde la transferencia de costos
sigue siendo excepcional. La UE transita así de un modelo de compensación por daño
hacia uno de inversión cooperativa basada en beneficios, manteniendo espacio para la
negociación voluntaria y la flexibilidad ante retos multinacionales de gran escala.
13
==End of OCR for page 14==
==Start of OCR for page 15==
Capítulo 3
Modelos Bilaterales y Subregionales en
Sudamérica
A diferencia del marco supranacional y altamente integrado de Europa, el panorama
de las interconexiones eléctricas en Sudamérica es más heterogéneo. Se caracteriza por la
coexistencia de megaproyectos binacionales heredados, regidos por tratados específicos,
y esfuerzos más recientes para crear mercados subregionales basados en principios de
cooperación y eficiencia económica. Este modelo dual presenta tanto oportunidades como
desafíos únicos para la integración energética del continente.
3.1. Proyectos Hidroeléctricos Binacionales: El Modelo
Financiero de Itaipú (Brasil-Paraguay)
La central hidroeléctrica de Itaipú, compartida por Brasil y Paraguay en el río Paraná,
es un ejemplo paradigmático de un acuerdo bilateral para un proyecto de infraestructura
a gran escala. [9] Su estructura financiera y operativa, definida en el Tratado de Itaipú de
1973, representa un modelo de cooperación que ha perdurado durante décadas, pero que
también ha generado debates significativos, especialmente en el contexto de su reciente
renegociación.
Contexto histórico y estructura
El tratado establece que la energía producida por la central, con capacidad instalada
de 14,000 MW, se divide en partes iguales entre los dos países. Crucialmente, el Artículo
XIII del tratado estipula que cada país tiene el derecho de adquirir la energía que no es
utilizada por el otro para su propio consumo.[10] En la práctica, dado que la demanda de
Paraguay es significativamente menor que la de Brasil, Paraguay ha cedido históricamente
la gran mayoría de su cuota de energía a Brasil.
Análisis del Anexo C: bases financieras
El mecanismo de fijación de precios de Itaipú no se basa en oferta y demanda, ni
en beneficios socioeconómicos, sino en el principio de Costo del Servicio de Electricidad,
detallado en el Anexo C del Tratado. [10] La tarifa se calcula anualmente para igualar
14
==End of OCR for page 15==
==Start of OCR for page 16==
exactamente el costo total del servicio (entidad binacional sin fines de lucro). Los com-
ponentes principales se sintetizan en la Tabla 3.1.
Cuadro 3.1: Estructura financiera y de pagos del Tratado
de Itaipú (Anexo C)
Componente
del Descripción
"Costo del Servicio"
Mecanismo de pa-
go/cálculo
Rendimiento del capi-
tal
Remuneración del 12% anual sobre el
capital integrado (ANDE y ELETRO-
BRÁS).
Porcentaje aplicado al capi-
tal aportado por cada enti-
dad.
Cargos financieros Intereses de los préstamos de construc- Según términos de los con-
(deuda)
Amortización
Royalties
ción.
tratos (componente elimina-
do post-2023).
Pago del principal de los préstamos.
Según cronogramas de
amortización (eliminado
post-2023).
Compensación por uso de recursos hí- USD/GWh generado, con
dricos a Brasil y Paraguay.
Resarcimiento por ad- Servicios de administración y supervi-
ministración
Gastos de explotación
Remuneración
energía cedida
sión (ANDE/ELETROBRÁS).
mínimo anual garantizado
(ajustable).
Monto fijo (ajustable) en
USD/GWh, distribuido en
partes iguales.
la Entidad Binacional.
Costos de operación y mantenimiento Según presupuesto anual de
(O&M).
utilizada.
por Pago a la parte que cede su cuota no USD/GWh cedido (valor fijo
ajustable, no precio de mer-
cado).
Mecanismo de pago y distribución de costos
El costo total del servicio se distribuye entre ANDE y ELETROBRÁS proporcio-
nalmente a la potencia contratada anualmente. [10] Se determina una tarifa única, en
USD/kW-mes, que ambas empresas pagan por la potencia contratada, garantizando la
cobertura íntegra de los costos y alta estabilidad financiera.
Desafíos y renegociación
El año 2023 marcó un punto de inflexión: se cumplieron 50 años de la firma del Tratado
y se saldó la deuda de construcción. Ello abrió la renegociación del Anexo C, con ejes
principales:[10], [11]
■ Nueva tarifa: sin deuda, el costo del servicio cae sustantivamente. Brasil busca
tarifas más bajas; Paraguay prioriza ingresos para desarrollo social e infraestructura
■ Precio de cesión de energía: Paraguay sostiene que la compensación fija no
refleja el valor de mercado del excedente y plantea mecanismos de venta más com-
petitivos (a Brasil u otros mercados).
15
==End of OCR for page 16==
==Start of OCR for page 17==
■ Gobernanza y gastos sociales: debate sobre usos de ingresos para proyectos
sociales e infraestructura y su gobernanza.
El modelo de Itaipú es un paradigma de reparto de recursos físicos bajo tratado bila-
teral, con lógica financiera de empresa conjunta que cubre costos y distribuye producto,
distinta a esquemas de mercado.
3.2. Integración Subregional: El Sistema de Interconexión Eléctrica Andina (SINEA)
La región andina avanza hacia un modelo de integración subregional. El SINEA
(Bolivia, Chile, Colombia, Ecuador, Perú) busca crear un corredor eléctrico que aproveche
complementariedades, con apoyo de la CAN y del BID.[12]
La Decisión 816 y el Mercado Andino Eléctrico Regional (MAER)
La Decisión 816 de la CAN (2017) crea el Mercado Andino Eléctrico Regional
de Corto Plazo (MAERCP).[13]
■ Mercado de excedentes: las transacciones internacionales se realizan con energía
remanente tras cubrir la demanda interna, garantizando seguridad de suministro
nacional.[13]
■ Despacho económico coordinado: las transacciones son resultado de un despa-
cho óptimo regional. Ningún importador paga un precio superior al costo local de
producir la misma energía con recursos propios disponibles (condición de beneficio
del importador).[14]
■ Remuneración de transmisión: el país exportador recibe un pago por uso de su
sistema vía Peaje Unitario, transparente y conocido ex ante, para internalizarlo en
el cálculo económico del intercambio.[14]
■ Gobernanza regional: un Coordinador Regional (rol rotativo por dos años) eje-
cuta el despacho coordinado y administra los aspectos comerciales. [14]
Barreras y perspectivas
Persisten barreras: capacidades limitadas en interconexiones existentes (p. ej., 220 kV
en Colombia-Ecuador y Ecuador-Perú) con retos de estabilidad y oscilaciones que res-
tringen intercambios confiables.[15] Además, se requiere mayor armonización técnica y
comercial para operación fluida; la plena incorporación de Chile sigue en desarrollo.[16]
El éxito de SINEA depende de coordinar inversiones en nueva transmisión y profundizar
la convergencia regulatoria.
3.3. Acuerdos Bilaterales Específicos: La Interconexión
Colombia-Panamá
Entre tratados binacionales y mercados subregionales surge un tercer modelo: acuerdos
regulatorios bilaterales para una interconexión concreta. El enlace Colombia-Panamá es
16
==End of OCR for page 17==
==Start of OCR for page 18==
estratégico para conectar Sudamérica y Centroamérica. [17]
Acuerdo regulatorio bilateral (junio de 2025)
En junio de 2025, la CREG (Colombia) y la ASEP (Panamá) formalizaron un acuerdo
que define reglas de operación y comercio para la futura interconexión.[18]
■ Principios rectores: eficiencia económica, beneficio mutuo, transparencia, reci-
procidad y visión regional (enfoque de mercado, más cercano a SINEA que al costo
de servicio de Itaipú).
■ Reglas y gobernanza: crea un Comité Binacional de Reguladores para supervi-
sión, seguimiento, gobernanza y resolución de disputas.
■ Enfoque en operación, no inversión: el acuerdo trata reglas operativas y со-
merciales; la asignación de costos de inversión se gestiona aparte (probablemente
vía acuerdos entre los TSO: ISA у ETESA), a diferencia del CBCA europeo.
Este enfoque es intermedio: más sofisticado que un PPA (crea marco de mercado
regulado) pero menos ambicioso que un mercado multilateral como SINEA.
3.4. Integración en Centroamérica: El Proyecto SIE-
PAC
El Sistema de Interconexión Eléctrica de los Países de América Central
(SIEPAC) combina infraestructura de transmisión regional con un mercado eléctrico
transnacional. [19] Iniciado con el Tratado Marco del Mercado Eléctrico de América Cen-
tral (1996), conecta Guatemala, El Salvador, Honduras, Nicaragua, Costa Rica y Pana-
má. [20]
Infraestructura y Mercado Eléctrico Regional (MER)
Dos componentes principales:[19]
■ Línea de transmisión: 230 kV, ~1,800 km de Guatemala a Panamá; propiedad de
la Empresa Propietaria de la Red (EPR), con socios de los seis países y de España,
Colombia y México.[21]
■ Mercado Eléctrico Regional (MER): competitivo, regido por competencia, gra-
dualidad y reciprocidad; permite transacciones de agentes (generadores, distribui-
dores, grandes consumidores) con reglas objetivas, transparentes y no discrimina-
torias.[20], [22]
La gobernanza del MER recae en dos organismos supranacionales: la Comisión Re-
gional de Interconexión Eléctrica (CRIE, regulador) y el Ente Operador Regional (EOR,
operación del sistema y del mercado).[23]
17
==End of OCR for page 18==
==Start of OCR for page 19==
Modelo financiero y asignación de costos
El costo inicial superó los 500 MUSD, financiados por fuentes multilaterales y aportes
de socios. [12] El BID fue clave (financiamiento y coordinación), junto con el BCIE y el
Gobierno de España. [12], [19]
Metodología de remuneración de peajes y recuperación de costos
La recuperación se realiza vía Cargos por Uso de la Red de Transmisión Regional
(RTR), destinados a cubrir el Ingreso Autorizado Regional (IARM) (CAPEX, ОРЕХ у
costos regulados de la infraestructura).[21] Se compone de:
Peaje (componente fijo). Aunque el peaje está definido, la regulación y propuestas
metodológicas de la CRIE han establecido que, para efectos prácticos de cálculo, el peaje
específico de la línea SIEPAC se considera con valor cero. En forma esquemática:
Peaje = AVNR + COУМ – ІТ,
donde AVNR es el aporte al valor neto regulatorio, COyM los costos de operación y
mantenimiento reconocidos, e IT los ingresos tarifarios por mercado.
Cargo Variable de Transmisión (CVT). Refleja condiciones de mercado y conges-
tión en tiempo casi real. Se calcula como:
CVT pnodal pnodal
=
ndación) × Etransacción.
retiro
Si la diferencia de precios es positiva, el agente paga; si es negativa, recibe un crédito.
Los ingresos del CVT financian operación y expansión de la red regional.
Cargo Complementario (CC). Asegura cubrir el remanente del IARM no recuperado
por otros cargos (p. ej., CVT o venta de derechos de transmisión):
CC
=
IARM
(IngresoscvT + Otros ingresos regulados).
Se asigna a los agentes en función de la energía de retiro, garantizando la viabilidad
financiera del operador.
Resultados y desafíos
SIEPAC mejoró estabilidad y seguridad de suministro regional, habilitando apoyos
mutuos ante déficits.[24] Las transacciones crecieron de 700 GWh (2013) a 3,100 GWh
(2022), con más de 300 agentes en el mercado.[19] Ello habilitó compras a precios más
competitivos que la generación local, contribuyendo a la estabilidad tarifaria. [25]
Persisten desafíos: armonización regulatoria nacional, [24] y la decisión de Guatemala
(2021) de denunciar el tratado marco, con salida proyectada para 2031, que introduce in-
certidumbre.[26]La Visión 2050 del MER prevé fuerte expansión solar y eólica, requirien-
do inversiones adicionales en transmisión y flexibilidad para estabilidad del sistema. [19]
18
==End of OCR for page 19==
==Start of OCR for page 20==
Capítulo 4
Marcos de Cooperación Emergentes en
Asia
El continente asiático presenta un panorama dinámico y ambicioso en cuanto a la
integración eléctrica, pero también uno que enfrenta los mayores desafíos en términos de
financiación, armonización regulatoria y madurez institucional. A diferencia de Europa,
donde el debate se centra en cómo optimizar un sistema ya interconectado, en Asia la
discusión primordial gira en torno a cómo financiar y construir la infraestructura básica y
establecer las reglas mínimas para que el comercio transfronterizo pueda ocurrir. En este
contexto, la asignación de costos y beneficios es, en gran medida, una consecuencia de las
negociaciones de financiación de proyectos individuales, más que un principio rector de
la planificación del sistema regional.
4.1. La Red Eléctrica de la ASEAN (APG): Ambición,
Financiación y Desafíos
La Red Eléctrica de la ASEAN (APG) es la iniciativa de integración más ambi-
ciosa de la región. Concebida como pilar del Plan de Acción de Cooperación Energética de
la ASEAN (APAEC), su visión es crear una red de interconexiones que abarque los diez
Estados miembros, habilitando el comercio multilateral de electricidad para mejorar la
seguridad energética, integrar los abundantes y diversos recursos renovables de la región
y fomentar la integración económica. [27]
Mecanismos de financiación: el principal cuello de botella
El principal obstáculo para la realización de la APG no es técnico, sino financiero.
Se estiman inversiones de al menos $100 mil millones (USD) a 2045 solo para infra-
estructura de transmisión. [27] Ante esta escala, ASEAN y socios exploran mecanismos
innovadores: [27]
■ Finanzas mixtas (blended finance): combinación de capital público/concesional
con inversión privada para mitigar riesgos y mejorar bancabilidad.
■ Asociaciones Público-Privadas (APP): el privado diseña, construye, financia
y opera a cambio de flujos de ingresos de largo plazo.
19
==End of OCR for page 20==
==Start of OCR for page 21==
■ Bancos Multilaterales de Desarrollo (BMD): el ADB y el Banco Mundial
catalizan con financiamiento directo (el ADB ha señalado disposición por $10 mil
millones), asistencia técnica y esquemas de reducción de riesgo. [27]
■ Fondo de financiación de la APG: los Ministros de Finanzas de ASEAN respal-
dan un fondo dedicado para atraer capital privado y destrabar inversiones de largo
plazo.[27]
Desafíos regulatorios y de precios
En paralelo, la APG encara la armonización regulatoria. El comercio actual es
mayormente bilateral, regido por acuerdos ad hoc.[28] Para pasar a un sistema multilateral
es imprescindible:[27]
■ Alineación regulatoria y estándares técnicos: armonizar normativas, códigos
de red y estándares para asegurar interoperabilidad.
■ Metodología regional de cargos por uso de red (wheeling): falta una regla
transparente y acordada para el tránsito por terceros países; sin ella, el comercio
multilateral es inviable.
■ Gobernanza institucional: crear una entidad regional con mandato para facilitar
integración de mercado, coordinar la planificación y resolver disputas.
Estado actual de los modelos de precios
Documentos oficiales de ASEAN y socios de desarrollo indican que no existe aún un
modelo regional de precios o asignación de costos para la APG. [27] La estrategia del
APAEC es secuencial: (i) asegurar financiación y construir infraestructura; (ii) desarro-
llar marcos institucionales y regulatorios para el comercio; y (iii) eventualmente avanzar
hacia precios armonizados. Por ahora, la asignación de costos y beneficios permanece en
el terreno de negociaciones bilaterales por proyecto.
4.2. Comercio Eléctrico Subregional: GMS y BBIN
Existen iniciativas subregionales que, aunque de menor escala que la APG, enfrentan
desafíos similares y dejan lecciones valiosas.
Subregión del Gran Mekong (GMS)
La cooperación energética GMS (Camboya, partes de China, Laos, Myanmar, Tai-
landia y Vietnam) ha recibido fuerte apoyo del ADB.[29] Un informe clave sobre ar-
monización identifica con precisión los obstáculos para pasar de comercio bilateral a
multilateral:[30]
■ Obstáculos: ausencia de acceso abierto y no discriminatorio a redes nacionales; los
IPP carecen de vías claras para exportar vía terceros países; falta de metodología
común de peajes desalienta a países de tránsito.
20
==End of OCR for page 21==
==Start of OCR for page 22==
■ Medidas propuestas: enfoque gradual y pragmático—formalizar acceso abierto,
desarrollar metodología de peajes basada en costos y flujos de potencia, y crear
un Centro Regional de Coordinación de Energía (RPCC) para coordinar
comercio de corto plazo, calcular peajes y liquidar desequilibrios.[30]
Iniciativa BBIN (Bangladesh, Bután, India, Nepal)
Caso clásico de complementariedad: Bután y Nepal tienen gran potencial hidro;
India y Bangladesh muestran demanda creciente.[31]
■ Modelo vigente: predominantemente bilateral. India ha financiado y desarrollado
proyectos hidro en Bután y Nepal a cambio de PPA de largo plazo para exportar
mayormente a India. [32]
■ Costos de transmisión: no existe marco multilateral formal para repartir inver-
sión en transmisión; se negocia caso a caso dentro del paquete de financiación del
proyecto de generación.
■ Necesidad de marco común: con mayor volumen de comercio, CEPAL/ESCAP у
Banco Mundial enfatizan evolucionar hacia un mercado subregional más integrado:
acuerdo marco de cooperación, comité directivo transfronterizo y armonización de
normas comerciales.[31]
4.3. Caso de Aplicación: PPA en Proyectos de Expor-
tación (Laos-Tailandia)
Para entender la asignación práctica de costos y beneficios en Asia, es ilustrativo el
diseño de los PPA que soportan exportaciones desde Laos hacia Tailandia; el PPA de la
presa de Xayaburi es representativo.[33]
Estructura del PPA
Contratos comerciales a largo plazo (25-30 años) entre un IPP (promotor en Laos) y
un comprador único (EGAT, Tailandia).
Cláusula take-or-pay
Elemento central: EGAT paga por una cantidad mínima de energía disponible, la
consuma o no. La garantía de flujo estable y predecible es crítica para apalancar la
financiación a gran escala; en esencia, traslada el riesgo de demanda desde el promotor
hacia el comprador.[33]
Asignación de riesgos
El PPA detalla la asignación de otros riesgos: el promotor asume riesgos regulatorio y
de construcción en Laos; el comprador puede asumir parte del riesgo político/regulatorio
en Tailandia vía cláusulas de fuerza mayor (con pagos compensatorios). Hay penalizacio-
nes por retrasos o por no cumplir niveles de disponibilidad.[33]
21
==End of OCR for page 22==
==Start of OCR for page 23==
Modelo general
El PPA se enmarca en un MoU intergubernamental que establece objetivos de
compra de energía.[34] La tarifa no surge de un mercado competitivo, sino de negociación
por proyecto para ser atractiva y estable al comprador y ofrecer retorno adecuado a
inversionistas.[34]
Conclusión. En mercados emergentes asiáticos, la “asignación de costos y beneficios" se
resuelve primordialmente a nivel de proyecto, impulsada por la necesidad de financiar.
Marcos regionales como la APG operan hoy más como catalizadores políticos y finan-
cieros que como reguladores de un mercado integrado. La evolución hacia mecanismos
de asignación a nivel de sistema, al estilo europeo, dependerá de la construcción de la
infraestructura física y de una paciente armonización institucional y regulatoria.
22
==End of OCR for page 23==
==Start of OCR for page 24==
Capítulo 5
Análisis Comparativo y Síntesis Global
El análisis de los marcos de asignación de costos y beneficios en Europa, Sudamérica
y Asia revela no solo diferencias en los mecanismos específicos, sino también divergencias
fundamentales en la filosofía subyacente, la estructura de gobernanza y el nivel de madurez
del mercado. Estos elementos están intrínsecamente ligados y ofrecen una visión clara de
cómo las distintas regiones abordan el desafío de la cooperación energética transfronteriza.
La comparación directa de estos modelos, como se resume en la Tabla 5.1, permite extraer
conclusiones de alto nivel sobre las tendencias globales y las etapas evolutivas de la
integración eléctrica.
5.1. Filosofías de Asignación: del Costo de Servicio al
Beneficio Social
Se distinguen tres paradigmas dominantes:
■ Europa (Basado en Beneficios). Los costos de infraestructura los sufragan quie-
nes reciben los beneficios. Requiere cuantificación rigurosa del bienestar socioeco-
nómico (eficiencia de mercado, reducción de emisiones) por país. La metodología
CBA de ENTSO-E materializa esta filosofía y habilita que el CBCA asigne costos
proporcionalmente a beneficios. Enfocado en optimizar el bienestar continental.
■ Sudamérica (Modelo Híbrido). Coexisten: (i) costo de servicio (p. ej., Itaipú),
donde la tarifa cubre costos del activo y se reparte entre socios cualesquiera sean
los precios de mercado; y (ii) filosofía de mercado (p. ej., SINEA), que favorece el
despacho económico coordinado, precios que reflejan oferta-demanda y reducción
de costos operativos subregionales.
■ Asia (Basado en Proyecto/Contrato). Enfoque pragmático centrado en finan-
ciabilidad. La asignación se negocia en PPA bilaterales (p. ej., cláusula take-or-pay)
para asegurar flujos de ingresos bancables al inversor y precios estables al compra-
dor. Prioriza ejecutar proyectos específicos más que optimizar un sistema regional.
5.2. Gobernanza y Soberanía: regulación supranacio-
nal vs. acuerdos nacionales
La gobernanza refleja la relación entre soberanía y cooperación:
23
==End of OCR for page 24==
==Start of OCR for page 25==
■ Europa. Alto grado de supranacionalidad. Comisión Europea y ACER poseen man-
datos vinculantes (TEN-E) y capacidad de decisión final ante desacuerdos entre re-
guladores nacionales. Aunque hay espacio para acuerdos voluntarios (p. ej., NSEC),
existe una autoridad superior que garantiza coherencia y aplicación.
■ Sudamérica y Asia. Predomina la soberanía nacional. La cooperación se apoya
en tratados o decisiones intergubernamentales (Itaipú, Decisión 816 de la CAN pa-
ra SINEA, MoU Laos-Tailandia). Sin un ente supranacional con poder decisorio
comparable a ACER; las decisiones se toman por consenso y dependen de su incor-
poración al derecho interno. El Comité Binacional del acuerdo Colombia-Panamá
ejemplifica una gobernanza conjunta pero estrictamente bilateral.
5.3. Madurez del mercado y enfoque de la inversión
El mecanismo de asignación es un indicador robusto de madurez:
■ Europa (mercado maduro). Red densamente interconectada y liberalizada. El
foco de inversión es la optimización (alivio de congestión, integración masiva de re-
novables). El CBCA financia proyectos con beneficios marginales pero ampliamente
distribuidos.
■ Asia (mercado emergente). Prioridad en construir infraestructura básica y atraer
financiamiento. Dominan PPA bilaterales que garantizan ingresos y bancabilidad.
■ Sudamérica (mercado en transición). Infraestructura relevante pero integra-
ción subóptima. El reto es pasar de proyectos aislados y comercio bilateral a una
red coordinada y un mercado más eficiente (SINEA y otros esfuerzos).
Esta dinámica sugiere una curva de madurez de la integración: en la fase inicial,
contratos bilaterales con garantías de ingreso; luego, marcos de acceso y peajes comunes
(subregional); finalmente, sistemas basados en beneficios a nivel continental (CBCA).
Así, la asignación de costos es un indicador del grado de integración política, económica
y técnica alcanzado.
24
==End of OCR for page 25==
==Start of OCR for page 26==
Cuadro 5.1: Análisis comparativo de marcos de asignación de
costos y beneficios
Filosofía primaria Base metodológica Gobernanza
Región / Caso
Mecanismo de pago Madurez del
principal
mercado
UE (CBCA)
Basado en beneficios СВА
ENTSO-E
(SEW, CO2, etc.)
Supranacional
(CE,
ACER) con negociación
entre ARN
Transferencia regulada
de costos de inversión integrado
(CBCA); rentas de
congestión
Maduro, altamente
Itaipú Binacional
Costo de servicio
Anexo C (cobertura
de costos del activo)
SINEA (MAERCP)
Basado en mercado
ASEAN Power Grid Basado en proyec-
(APG)
to/financiación
Proyectos de exporta- Basado en contrato
ción (Laos-Tailandia
PPA)
Binacional (Entidad Bi- Tarifa única USD/kW- No es mercado; ac-
nacional Itaipú)
mes por potencia contra- tivo compartido
tada
Despacho económico Subregional (CAN;
coordinado
Coordinador
rotativo)
Regional
Negociación por pro-
yecto (bancabilidad)
Intergubernamental
(ASEAN; comités)
Negociación comer-
cial bilateral
Bilateral (MoU + con-
trato)
Precios de corto plazo;
peaje unitario por trans-
misión
Predominan PPA bila-
terales; modelo regional
aún no definido
Tarifa a largo plazo con
take-or-pay
En transición su-
bregional
Emergente,
inte-
gración limitada
Comercio punto a
punto
25
==End of OCR for page 26==
==Start of OCR for page 27==
Capítulo 6
Recomendaciones Estratégicas y
Perspectivas Futuras
El análisis comparativo de los mecanismos de asignación de costos y beneficios en
diferentes regiones del mundo no solo revela una diversidad de enfoques, sino que tam-
bién permite extraer lecciones y formular recomendaciones estratégicas adaptadas a los
distintos niveles de madurez de la integración energética. A medida que la transición
energética global se acelera, la necesidad de interconexiones transfronterizas se volverá
aún más crítica, exigiendo marcos de cooperación más robustos y eficientes.
6.1. Mejores prácticas para la estructuración de acuer-
dos de inversión
La estructuración de acuerdos de inversión exitosos para interconexiones transfronte-
rizas debe ser sensible al contexto regional y al nivel de desarrollo del mercado:
■ Mercados emergentes (Asia y partes de Sudamérica). La prioridad es crear
marcos regulatorios habilitantes antes de diseñar mecanismos complejos de reparto
de beneficios. La experiencia de la Subregión del Gran Mekong (GMS) muestra
que sin acceso abierto a la red ni metodologías predecibles de cargos por peaje
(wheeling charges), el comercio multilateral y la inversión privada seguirán siendo
limitados. [30] El primer paso debe ser establecer reglas claras que generen confianza
y reduzcan incertidumbre regulatoria.
■ Mercados en transición (SINEA, región andina). Con un marco básico en
pie, se debe fortalecer la capacidad y credibilidad de las instituciones regionales. En
el Mercado Andino Eléctrico Regional (MAER) esto implica dotar al Coordinador
Regional de recursos técnicos y autoridad para un despacho económico coordina-
do imparcial y eficiente. Además, es clave profundizar la armonización regulatoria
técnica y comercial. La experiencia de ACER en Europa puede servir como modelo
aspiracional a largo plazo.
■ Mercados maduros (Europa). En sistemas densamente interconectados, el de-
safío es la complejidad creciente. Los interconectores híbridos offshore requieren
mayor flexibilidad. El marco debe fijar principios y metodologías (p. ej., CBA de
ENTSO-E), pero también permitir acuerdos negociados voluntarios entre países
para la asignación final de costos.[35]
26
==End of OCR for page 27==
==Start of OCR for page 28==
6.2. Recomendaciones de política para fomentar la coope-
ración transfronteriza
Más allá de acuerdos individuales, se requieren políticas de alto nivel que generen un
entorno favorable:
■ Rol estratégico de los Bancos Multilaterales de Desarrollo (BMD). El
Banco Mundial, BID y ADB deben ir más allá del financiamiento. Su mayor valor
añadido es condicionar apoyo financiero a reformas regulatorias y fortalecimiento
institucional, actuando como catalizadores y transferidores de conocimiento. Pueden
ayudar a desarrollar metodologías de análisis costo-beneficio inspiradas en ENTSO-
Ε.
■ Promoción de planificación coordinada regional. El mayor obstáculo es la
planificación puramente nacional. Se debe incentivar la planificación de transmi-
sión regional para identificar proyectos con mayor valor sistémico. El TYNDP de
ENTSO-E es el estándar de referencia. [36]
■ Gestión explícita de la incertidumbre. Los acuerdos deben ser resilientes. Es
clave incluir análisis estocásticos en planificación, cláusulas de revisión periódica y
mecanismos de compensación flexibles para ajustar condiciones a mercados cam-
biantes y a diferencias entre beneficios esperados y realizados.
6.3. Tendencias emergentes y conclusión final
La transición energética global hacia renovables variables (eólica, solar) redefine la
economía de los sistemas eléctricos. Las interconexiones ya no son solo medios de comercio,
sino herramientas indispensables para:
■ gestionar la intermitencia,
■ compartir flexibilidad,
■ garantizar la adecuación del sistema,
■ mantener la estabilidad de redes con menor inercia.
Esto ejercerá presión sobre los modelos actuales de asignación de costos. Los futuros
mecanismos deberán valorar y asignar no solo costos y beneficios de energía (MWh), sino
también de servicios auxiliares: reserva de frecuencia, capacidad de rampa, respuesta de
la demanda y estabilidad de red.
Conclusión. No existe un modelo universalmente aplicable de asignación de costos y bene-
ficios. Cada región debe diseñar su enfoque según contexto histórico, madurez de mercado
y arquitectura institucional. Sin embargo, surgen principios universales indispensables:
■ transparencia en los cálculos,
■ asignación basada en beneficios cuantificables y objetivos,
■ gobernanza sólida, independiente y cooperativa.
27
==End of OCR for page 28==
==Start of OCR for page 29==
Solo con estos principios será posible desbloquear la inversión transfronteriza masiva
necesaria para construir una red eléctrica global integrada, resiliente y sostenible en el
siglo XXI.
28
==End of OCR for page 29==
==Start of OCR for page 30==
Bibliografía
[1] Agency for the Cooperation of Energy Regulators (ACER), “ACER CВСА Мо-
nitoring Report," 2025, Accessed 1 September 2025. visitado 1 de sep. de 2025.
dirección: https://www.apren.pt/contents/publicationsothers/acer-cbca-
monitoring-report-2025.pdf.
[2] Florence School of Regulation, “Cross-Border Cost Allocation and Cost-Sharing for
Investment Supporting the Energy Transition,” 2024. visitado 1 de sep. de 2025.
dirección: https://fsr.eui.eu/wp-content/uploads/2023/12/240209_WS-
Cross-border-cost_Programme_no-name.pdf.
[3] ENTSO-E, “ENTSO-E Recommendations to ACER and NRAs on the CВСА Im-
plementation,” 2016. visitado 1 de sep. de 2025. dirección: https://www.entsoe.
eu/Documents/Publications/Position%20papers%20and%20reports/160624_
IF_Day2_Session2_handout_CBCA.PDF.
[4] ENTSO-E, “Guideline for Cost Benefit Analysis of Grid Development Projects,"
2015. visitado 1 de sep. de 2025. dirección: https://www.entsoe.eu/Documents/
SDC%20documents/TYNDP/ENTSO-E%20cost%20benefit%20analysis%20approved%
20by%20the%20European%20Commission%20on%204%20February%202015.pdf.
[5] ENTSO-E, Tyndp 2024 Scenarios Methodology Report. dirección: https://2024.
entsos - tyndp - scenarios.eu/wp-content/uploads/2024/05/TYNDP_2024_
Scenarios_Methodology_Report_240522.pdf.
[6] ENTSO-E. “Cost Benefit Analysis ENTSO-E | Explore the TYNDP,” visitado
1 de sep. de 2025. dirección: https://tyndp.entsoe.eu/explore/what-is-the-
cost-benefit-analysis-framework.
[7] ENTSO-E. “4th ENTSO-E Guideline for Cost-Benefit Analysis of Grid Develop-
ment Projects,” visitado 1 de sep. de 2025. dirección: https://tyndp.entsoe.eu/
resources/guideline-for-cost-benefit-analysis-4.0.
[8] European Commission. “The North Seas Energy Cooperation," visitado 1 de sep. de
2025. dirección: https://energy.ec.europa.eu/topics/infrastructure/high-
level-groups/north-seas-energy-cooperation_en.
[9] European Commission. “Offshore Renewable Energy,” visitado 1 de sep. de 2025. di-
rección: https://energy.ec.europa.eu/topics/renewable-energy/offshore-
renewable-energy_en.
[10] Itaipú Binacional, “Anexo C al Tratado de Itaipú (Brasilia, 26.04.1973): Bases,"
1973. visitado 1 de sep. de 2025. dirección: https://www.itaipu.gov.py/sites/
default/files/af_df/anexoC_Esp.pdf.
29
==End of OCR for page 30==
==Start of OCR for page 31==
[11] Ministerio de Relaciones Exteriores del Paraguay. “Canciller: revisión del Anexo
Ces oportunidad para una renegociación integral del Tratado de Itaipú," visitado
1 de sep. de 2025. dirección: https://www.mre.gov.py/index.php/noticias-
de-embajadas-y-consulados/canciller-sostuvo-que-revision-del-anexo-
c-es-la-oportunidad-para-una-renegociacion-integral-del-tratado-de-
itaipu.
[12] ARIAE. “Marco Normativo: Sistema de Interconexión Eléctrica Andina (SINEA),”
visitado 1 de sep. de 2025. dirección: https://www.ariae.org/servicio -
documental/marco-normativo-sistema-de-interconexion-electrica-andina-
sinea.
[13] Comunidad Andina. "Se aprueba Marco Regulatorio de Mercados de Energía Eléc-
trica en la Comunidad Andina,” visitado 1 de sep. de 2025. dirección: https://www.
comunidadandina.org/notas – de – prensa/se-aprueba-marco-regulatorio-
de-mercados-de-energia-electrica-en-la-comunidad-andina/.
[14] Comunidad Andina. “Periodo ciento cuarenta y uno de sesiones ordinarias Deci-
sión 816," visitado 1 de sep. de 2025. dirección: https://www.comunidadandina.
org/StaticFiles/DocOf/DEC816.pdf.
[15] OLADE. “Sistema de Interconexión Eléctrica Andina
SINEA (Centro de Docu-
mentación OLADE),” visitado 1 de sep. de 2025. dirección: https://biblioteca.
olade.org/opac-tmpl/Documentos/hm000690.pdf.
[16] Ministerio de Minas y Energía de Colombia. “Gobierno de Colombia liderará accio-
nes de interconexión eléctrica entre países de la región andina,” visitado 1 de sep. de
2025. dirección: https://minenergia.gov.co/es/sala-de-prensa/noticias-
index / gobierno - de - colombia - liderara - acciones - de - interconexion
electrica-entre-paises-de-la-region-andina/.
[17] Banco Interamericano de Desarrollo (BID). “Interconexión Eléctrica Colombia-Panamá
(RS-T1241),” visitado 1 de sep. de 2025. dirección: https://www.iadb.org/es/
proyecto/RS-T1241.
[18] Comisión de Regulación de Energía y Gas (CREG). “Colombia y Panamá forma-
lizan acuerdo regulatorio para la interconexión eléctrica binacional,” visitado 1 de
sep. de 2025. dirección: https://creg.gov.co/publicaciones/15874/colombia-
y - panama - formalizan - acuerdo - regulatorio - para - la - interconexion
electrica-binacional/.
[19] Banco Interamericano de Desarrollo (BID), “Integración eléctrica centroamericana:
génesis, beneficios y prospectiva del Proyecto SIEPAC," n.d. visitado 2 de sep. de
2025. dirección: https://publications.iadb.org/publications/spanish/
document / Integraci%C3%B3n-el%C3%A9ctrica - centroamericana – G%C3%
A9nesis - beneficios - y - prospectiva – del – Proyecto – SIEPAC – Sistema - de -
Interconexi%C3%B3n-El%C3%A9ctrica – de – los – Pa%C3%ADses - de - Am%C3%
A9rica-Central.pdf.
[20] CRIE. "Tratado Marco del Mercado Eléctrico de América Central," visitado 2 de
sep. de 2025. dirección: http://crie.org.gt/wp/wp-content/uploads/2014/
01/tratado_marco_del_mercado_electrico_de_america_cen.pdf.
[21] CRIE. “MER Comisión Regional de Interconexión Eléctrica," visitado 2 de
sep. de 2025. dirección: https://crie.org.gt/mer/.
30
==End of OCR for page 31==
==Start of OCR for page 32==
[22] A. no especificado, “Métodos de Asignación de Costos del Sistema de Transporte,"
Universidad de San Carlos de Guatemala, Facultad de Ingeniería, n.d. visitado 2 de
sep. de 2025. dirección: http://biblioteca.usac.edu.gt/tesis/08/08_0532_
EA.pdf.
[23] Banco Interamericano de Desarrollo (BID). “Impulsando la integración energética
centroamericana con SIEPAC y MER,” visitado 2 de sep. de 2025. dirección: https:
//www.iadb.org/es/quienes-somos/resultados-efectividad/impacto-en-
la-region/impulsando - integracion – energetica – centroamericana - con
siepac-y-mer.
[24] Proyecto de Integración y Desarrollo de Mesoamérica, “El PPP: Avances, retos y
perspectivas — Informe X Cumbre (ESP)," n.d. visitado 2 de sep. de 2025. dirección:
https://www.proyectomesoamerica.org/images/Anexos/Informes/Informe-
X-Cumbre-ESP.pdf.
[25] Empresa Propietaria de la Red (EPR). “Línea SIEPAC,” visitado 2 de sep. de 2025.
dirección: https://www.eprsiepac.com/linea-siepac/.
[26] YouTube. “SIEPAC, 10 años de éxito: Integración Eléctrica de Centroamérica,”
visitado 2 de sep. de 2025. dirección: https://www.youtube.com/watch?v=
VZav5Ii2gs4.
[27] ASEAN Business Advisory Council (ASEAN-BAC). “Inside ASEAN's $100B Power
Play: Can the ASEAN Power Grid Electrify an Entire Region?” Visitado 1 de sep. de
2025. dirección: https://asean-bac.org/news-and-press-releases/inside-
asean - s - 100b – power - play - can - the - asean – power - grid – electrify - an -
entire-region.
[28] T. K. Do y P. J. Burke, “Is ASEAN Ready to Move to Multilateral Cross-Border
Electricity Trade?” ZCEAP Working Paper 22-06, 2022. visitado 1 de sep. de 2025.
dirección: https://iceds.anu.edu.au/files/ZCEAP%20WP%2022-06%20D0%
20and%20Burke%20ASEAN%20electricity%20trade.pdf.
[29] Asian Development Bank (ADB). “Greater Mekong Subregion (GMS) Economic
Cooperation Program,” visitado 1 de sep. de 2025. dirección: https://www.adb.
org/what-we-do/topics/regional-cooperation/gms.
[30] Asian Development Bank (ADB), “Harmonizing Power Systems in the Greater
Mekong Subregion to Facilitate Trade," 2020. visitado 1 de sep. de 2025. direc-
ción: https://www.adb.org/sites/default/files/publication/615341/
harmonizing-power-systems-gms-facilitate-trade.pdf.
[31] UN ESCAP, “Improving Energy Connectivity in the BBIN Subregion with Speci-
fic Focus on the Northeastern Region of India,” n.d. visitado 1 de sep. de 2025.
dirección: https://repository.unescap.org/server/api/core/bitstreams/
7ff25cb5-b374-4c75-9f78-0f68ac5c3f5b/content.
[32] F. A. Wolak, “Cross Border Electricity Trade in BBIN Region: A Cost-Based Mar-
ket Perspective,” Stanford University, 2014. visitado 1 de sep. de 2025. dirección:
https://web.stanford.edu/group/fwolak/cgi-bin/sit /group/fwolak/cgi-bin/sites/default/files/
Insight_April14_clean.pdf.
31
==End of OCR for page 32==
==Start of OCR for page 33==
[33] World Bank PPP Knowledge Lab. “Laos PDR Power Purchase Agreement (PPA)
for the Xayaburi Dam Project,” visitado 1 de sep. de 2025. dirección: https://
ppp.worldbank.org/library/laos-pdr – power - purchase - agreement – ppa -
xayaburi-dam-project.
[34] Securities and Exchange Commission, Thailand. “CS18/2023: Execution of the Po-
wer Purchase Agreement for Pak Beng Hydroelectric,” visitado 1 de sep. de 2025.
dirección: https://market.sec.or.th/public/idisc/Download?FILEID=dat/
news/202309/1391NWS210920231811240804E.pdf.
[35] ENTSO-E. “Position Paper on Cost-Sharing Offshore Grid Projects,” visitado 1 de
sep. de 2025. dirección: https://www.entsoe.eu/2025/07/09/position-paper-
on-cost-sharing-offshore-grid-projects/.
[36] ENTSO-E, “TYNDP 2022 High-Level Report,” 2022. visitado 1 de sep. de 2025.
dirección: https://eepublicdownloads.blob.core.windows.net/public-cdn-
container/tyndp-documents/TYNDP2022/public/high-level-report.pdf.
32
==End of OCR for page 33==
==Start of OCR for page 1==
International Electrical Interconnections:
Financing and Management
November 11, 2025
==End of OCR for page 1==
==Start of OCR for page 2==
Contents
1 Introduction
1.1 Purpose and Scope of the Review
1.1.1 Statement of Purpose
1.1.2 Specific Objectives:
1.2 Methodology of Literature Selection
Transformation of Query
1.2.1
1.2.2 Screening Papers
2
3
3
3
3
3
4
1.2.3 Citation Chaining - Identifying additional relevant works
4
1.2.4 Relevance scoring and sorting
4
1.3 Results .
4
1.3.1 Descriptive Summary of the Studies
4
1.3.2 Critical Analysis and Synthesis
8
1.4 Conclusion.
9
1
==End of OCR for page 2==
==Start of OCR for page 3==
Abstract
This review synthesizes research on "International Electrical Interconnections: Financing
and Management" to address the multifaceted challenges of cross-border electricity co-
operation. The review aimed to evaluate financial and payment models, benchmark risk
management frameworks, identify state participation roles, compare benefit allocation
mechanisms, and analyze institutional arrangements. A systematic analysis of diverse
empirical and theoretical studies from multiple regions was conducted, focusing on gover-
nance models, economic frameworks, and policy instruments. Findings reveal that mixed
public-private financing and innovative payment schemes enhance investment viability
but face regulatory fragmentation; advanced risk management incorporates stochastic
modeling and cooperative compensation yet lacks empirical validation; state participa-
tion is pivotal for regulatory harmonization and infrastructure development but may in-
troduce political risks; equitable benefit sharing is supported by cooperative game theory
approaches, though practical implementation remains complex; and institutional frame-
works and market designs critically influence integration success despite persistent regu-
latory heterogeneity. These findings converge to underscore the necessity of integrated,
flexible governance and financial mechanisms that balance economic efficiency, risk miti-
gation, and equitable compensation. The synthesis informs future infrastructure planning
and policy harmonization to advance sustainable and resilient international electricity in-
terconnections.
==End of OCR for page 3==
==Start of OCR for page 4==
TLDR
This review examines international electrical interconnections, focusing on financing,
payment mechanisms, risk management, state participation, and benefit compensation
among members. It identifies diverse funding models and payment structures support-
ing cross-border energy trade. Risk mitigation approaches vary, often involving state
actors to enhance stability. The analysis highlights equitable benefit-sharing as crucial
for sustainable cooperation and regional integration.
1
==End of OCR for page 4==
==Start of OCR for page 5==
Chapter 1
Introduction
Research on international electrical interconnections, financing, payment mechanisms,
risk management, state participation, benefits and compensations among members has
emerged as a critical area of inquiry due to its potential to optimise energy resource al-
location, enhance regional cooperation, and support the transition to renewable energy
systems [1], [2]. The evolution of this field reflects a growing recognition of the impor-
tance of cross-border electricity trade, from early regional power pools to sophisticated
market coupling and integrated grid operations [3], [4]. The practical significance is un-
derscored by the increasing volume of interconnection projects worldwide, with benefits
including improved system reliability, cost reductions, and environmental gains [5], [6].
For instance, European interconnectors have demonstrated social benefits in 12 out of 13
planned projects, highlighting the economic and technical value of such initiatives [5], [7].
Despite these advances, the promotion and management of international electricity
interconnections face persistent challenges. The problem lies in the uneven distribution
of costs and benefits among participating countries, complex financing needs, and the de-
sign of equitable payment and risk-sharing mechanisms [8], [9]. Knowledge gaps remain
regarding effective institutional arrangements, compensation schemes under uncertainty,
and the integration of public and private investment models [10], [11], [12]. Controversies
persist between fully regulated versus merchant investment approaches and between cen-
tralized versus decentralized governance structures [9], [13]. The absence of harmonized
policies and coordinated risk management can hinder project realization and regional
market development [2], [14]. These gaps have practical consequences, including under-
investment, market instability, and suboptimal utilization of interconnections [15], [16].
A conceptual framework for this review integrates three key concepts: international
electricity interconnections as physical and institutional infrastructures enabling cross-
border trade; financing and payment mechanisms as economic tools to allocate costs and
benefits fairly; and risk management as strategies to mitigate uncertainties inherent in
multi-jurisdictional projects [8], [11], [17]. These concepts are interrelated, as governance
and financial arrangements influence risk exposure and benefit distribution, which in turn
affect the sustainability and expansion of interconnections [18], [19].
The purpose of this systematic review is to synthesize current knowledge on interna-
tional electricity interconnections focusing on financing, payment mechanisms, risk man-
agement, state participation, and benefit compensation among member countries. This
review aims to fill identified gaps by critically analyzing diverse models and experiences,
thereby providing a comprehensive understanding that supports policy and investment
decisions in emerging and established regional markets [2], [20]. The review methodology
2
==End of OCR for page 5==
==Start of OCR for page 6==
involves a structured analysis of peer-reviewed literature and case studies, emphasizing
comparative insights across regions and governance models. Inclusion criteria prioritize
studies addressing economic, institutional, and technical aspects of cross-border electric-
ity trade. Findings are organized thematically to elucidate mechanisms of cost-benefit
allocation, risk mitigation, and stakeholder roles [1], [21]. This approach facilitates an
integrated perspective on the complexities and opportunities in advancing international
electricity interconnections.
1.1 Purpose and Scope of the Review
1.1.1 Statement of Purpose
The objective of this report is to examine the existing research on "International Electri-
cal Interconnections: Financing and Management" in order to provide a comprehensive
synthesis of the theoretical frameworks, practical implementations, and policy consider-
ations that underpin international electricity interconnections. This review is important,
as it addresses the multifaceted challenges and opportunities associated with cross-border
electricity trade, including financial arrangements, risk allocation, and equitable benefit
sharing among participating states. By systematically analyzing diverse mechanisms and
governance models, the report aims to inform future infrastructure development, regula-
tory harmonization, and cooperative strategies that enhance regional energy integration
and sustainability.
1.1.2
Specific Objectives:
• To evaluate current knowledge on financial models and payment mechanisms sup-
porting international electricity interconnections.
• Benchmarking of risk management frameworks employed in cross-border electricity
transmission projects.
• Identification and synthesis of state participation roles and their impact on inter-
connection governance and investment.
• To compare benefit allocation and compensation mechanisms among member coun-
tries in international electricity markets.
• To deconstruct institutional and regulatory arrangements facilitating effective co-
operation in transnational electricity trading.
1.2 Methodology of Literature Selection
1.2.1 Transformation of Query
By systematically expanding a broad research question into several targeted queries, we
ensure that your literature search is both comprehensive (you won't miss niche or jargon-
specific studies) and manageable (each query returns a set of papers tightly aligned with
a particular facet of your topic). Below were the transformed queries we formed from the
original query:
3
==End of OCR for page 6==
==Start of OCR for page 7==
• Economic implications of international electricity interconnections, risk manage-
ment frameworks, regulatory challenges in cross-border electricity trade, financial
models for electricity interconnectors, incentives for state participation in transna-
tional energy projects, mechanisms for compensation among interconnected nations
• Economic advantages of international electricity connections, regulatory frameworks
for cross-border energy trade, impact of state participation in international electric-
ity markets, risk management strategies in transnational power exchange, compen-
sation mechanisms for interconnected energy systems
• Socio-economic benefits of international electricity interconnections, regional coop-
eration in electricity markets, impacts of cross-border energy trade on environmental
sustainability, economic integration through electricity interconnections, efficiency
gains from regional electricity market integration
• Mechanisms for financial integration and risk management in international elec-
tricity interconnections, successful case studies of regional electricity cooperation,
comparative analysis of cross-border electricity market frameworks
1.2.2
Screening Papers
We then run each of your transformed queries with the applied Inclusion & Exclusion
Criteria to retrieve a focused set of candidate papers for our always expanding database
of over 270 million research papers. during this process we found 437 papers.
1.2.3
Citation Chaining - Identifying additional relevant works
• Backward Citation Chaining: For each of your core papers we examine its ref-
erence list to find earlier studies it draws upon. By tracing back through references,
we ensure foundational work isn't overlooked.
• Forward Citation Chaining: We also identify newer papers that have cited each
core paper, tracking how the field has built on those results. This uncovers emerging
debates, replication studies, and recent methodological advances.
A total of 61 additional papers are found during this process.
1.2.4 Relevance scoring and sorting
We take our assembled pool of 498 candidate papers (437 from search queries + 61 from
citation chaining) and impose a relevance ranking so that the most pertinent studies rise
to the top of our final papers table. We found 488 papers that were relevant to the
research query. Out of 488 papers, 50 were highly relevant.
1.3 Results
1.3.1
Descriptive Summary of the Studies
This section maps the research landscape of the literature on international electricity in-
terconnections, financing, payment mechanisms, risk management, government participa-
tion, and benefits and compensation among member countries. revealing a broad spectrum
4
==End of OCR for page 7==
==Start of OCR for page 8==
of theoretical and empirical investigations into cross-border electricity interconnections.
The studies encompass diverse geographic regions including Europe, Asia, Latin America,
and Africa, employing methodologies ranging from cooperative game theory and economic
modeling to case studies and policy analysis. Key themes include financial structuring,
risk allocation, state involvement, benefit sharing, and institutional frameworks, which
collectively address the multifaceted challenges of international electricity cooperation.
This comparative synthesis is crucial for understanding how different mechanisms and
governance models influence investment stability, equitable compensation, and market
integration, thereby informing future infrastructure and policy development.
Study
Financial
Mecha-
nisms
Table 1.1: Summary of Reviewed Studies
coordination
transmission
Risk Man- State Par-
agement
Ap-
proaches
Identifies
market
design
ticipation
Models
Mixed
public-
private roles
[1]
Market
and
challenges
in market
pricing
and solutions
coordination
mechanisms
for risk
in cross-
mitigation
Benefit
and Com-
pensation
Allocation
Focus on
economic
benefit
distribution
via market
mechanisms
Institutional
and
Regulatory
Frame-
works
Comparative
analysis of
regional
market
governance
structures
regional
[10]
markets
Cooperative Allocation
game
considers
theory-based
incremental
cost-benefit
contributions
allocation
using
Shapley
to manage
cooperation
risks
[22]
Emphasizes
Fair and
Framework
cooperative
stable
for power
agreements
benefit-cost
purchase
among states
sharing via
agreements
axiomatic
supporting
methods
cooperation
Value
Multi-
stakeholder
benefit
evaluation
integrating
investor and
state
perspectives
Addresses
stakeholder-
specific risk
perceptions
in benefit
assessment
Highlights
roles of
investors and
international
lenders
5
Comprehensive Proposes
benefit
index system
evaluation for
reflecting
cross-border
diverse
project
stakeholder
assessment
interests
==End of OCR for page 8==
==Start of OCR for page 9==
Table 1.1: Summary of Reviewed Studies
Study
Financial
Risk Man-
State Par-
Benefit
Mecha-
nisms
agement
Ap-
ticipation
and Com-
and
Models
pensation
proaches
Allocation
Institutional
Regulatory
Frame-
works
risk sharing
Explores
public-
private
[9]
Business
Discusses
models
asymmetric
including
public,
in merchant
private, and
mixed
and public
lines
dynamics
investment
[23]
schemes
Market
coupling and
congestion
management
as financial
mechanisms
Tradable
[24]
and
Financial
Models risk
calculation
and
optimization
of bene-
fits/costs
partnership
Role of
TSOs and
market
participants
in risk and
investment
decisions
Limited
state role,
focus on
market-
certificates
FTRs hedge
price
fluctuations
and support
Transmission
investment
based
Rights
confidence
instruments
Cost-benefit- Regulatory
risk
allocation
tailored to
investor
types
Impact of
coordinated
congestion
and ITC
mechanisms
on
participants
considera-
tions for
merchant
interconnec-
tors and
ΤΡΑ
exemptions
Emphasizes
regional
market
integration
and
regulatory
coordination
Compensation Market
through
tradable
certificates
and FTR
revenue
adjustments
design
facilitating
cross-border
capacity and
balancing
markets
[25]
[26]
(FTRs) for
financing
Governance
options for
financing
and cost
allocation in
cross-border
investments
Financing
offshore grids
with socio-
economic
benefit con-
siderations
Identifies
regulatory
challenges
and proposes
joint
solutions
Discusses
Cost
Proposes
ownership
allocation
integrated
models and
mechanisms
governance
regulatory
to address
building
roles
investment
blocks for
barriers
network
planning
Risk of
Highlights
suboptimal
planning due
to additional
offshore costs
multi-actor
cooperation
Benefits
include
including
states and
private
entities
innovation
and environ-
mental
gains, with
cost-risk
trade-offs
Governance
and
regulatory
frameworks
tailored to
offshore grid
specifics
6
==End of OCR for page 9==
==Start of OCR for page 10==
Table 1.1: Summary of Reviewed Studies
Study
Financial
Mecha-
nisms
Risk Man-
State Par-
Benefit
agement
Ap-
proaches
ticipation
Models
and Com-
and
pensation
Allocation
Institutional
Regulatory
Frame-
works
[18]
Cooperative
game theory
for reliability
and transfer
payments
Risk of
cascading
outages
State
Compensation Cooperative
cooperation
mechanisms frameworks
essential for
like
to support
managed via
reliability
Nucleolus for system
cooperative
targets
stable
integration
compensa-
benefit
and
tion
sharing
reliability
Financial Mechanisms: 35 studies analyzed diverse funding sources including pub-
lic subsidies, merchant investments, and cooperative financial models, highlighting the
importance of mixed public-private financing to address viability gaps and investment
incentives [9], [12], [27]. Payment schemes such as Power Purchase Agreements, Finan-
cial Transmission Rights, and tradable certificates are frequently proposed to ensure fair
compensation and hedge financial risks [8], [10], [24]. Economic models range from coop-
erative game theory to market coupling and cost-benefit analyses, emphasizing the need
for flexible and region-specific financial arrangements to support cross-border projects
[1], [19], [28].
Risk Management Approaches: 30 studies emphasized risk identification and mit-
igation strategies including stochastic modeling, cooperative compensation mechanisms,
and market-based hedging tools to manage price volatility and investment uncertainty
[8], [15], [18]. Risk allocation frameworks often involve multi-phase project risk assess-
ment and anticipatory coalition stability analysis to enhance investment confidence and
cooperation [11], [16]. Institutional and regulatory uncertainties are recognized as sig-
nificant risk factors, necessitating harmonized policies and governance to reduce barriers
and improve project feasibility [14], [27], [29].
State Participation Models: 28 studies documented varied state roles from direct
investment and regulation to enabling market frameworks and facilitating cooperation,
with some emphasizing strong government involvement in planning and financing [25],
[30], [31]. Public-private partnerships and mixed ownership models are common, reflect-
ing the complexity of balancing national interests with regional integration goals [9], [13].
State participation is critical in policy harmonization, regulatory oversight, and institu-
tional capacity building to foster stable and equitable cross-border electricity markets [3],
[4], [32].
Benefit and Compensation Allocation: 32 studies addressed fairness and efficiency
in distributing economic gains and costs, often employing cooperative game theory so-
lutions like the Shapley Value and Nucleolus to ensure stable and equitable allocations
7
==End of OCR for page 10==
==Start of OCR for page 11==
[8], [10], [18]. Compensation mechanisms include lump-sum payments, PPAs, and bi-
lateral agreements designed to mitigate welfare losses and incentivize participation [8],
[16]. Benefit evaluations incorporate multi-stakeholder perspectives and comprehensive
indices to capture economic, environmental, and social impacts, supporting informed
decision-making [22], [33].
Institutional and Regulatory Frameworks: 34 studies compared governance struc-
tures and market designs, highlighting the importance of integrated institutional arrange-
ments, transparent planning, and stakeholder engagement for successful cooperation [3],
[7], [34]. Regulatory harmonization and coordinated network planning are recurrent
themes to overcome barriers and align national policies with regional objectives [4], [25],
[35]. Innovative market designs, including market coupling and co-optimized energy-
reserve allocation, are proposed to enhance efficiency and sustainability in cross-border
electricity trade [21], [36].
1.3.2 Critical Analysis and Synthesis
The reviewed literature on international electricity interconnections reveals a compre-
hensive exploration of financial models, risk management, state participation, benefit
allocation, and institutional frameworks. Strengths include the application of coopera-
tive game theory, multi-stakeholder benefit evaluations, and practical case studies that
provide valuable insights into the complexities of cross-border electricity trade. How-
ever, limitations persist in the heterogeneity of methodologies, regional focus biases, and
challenges in harmonizing regulatory and policy frameworks. Furthermore, while many
studies propose theoretical mechanisms for risk and benefit sharing, empirical validation
and implementation remain limited. The synthesis highlights the need for integrated
approaches that balance economic efficiency, equitable compensation, and political feasi-
bility to advance sustainable international electricity cooperation.
8
==End of OCR for page 11==
==Start of OCR for page 12==
Aspect
Financing and
Table 1.2: Strengths and Weaknesses of the Literature
Payment Mechanisms
Risk Management
Frameworks
Strengths
Several studies offer robust
frameworks for financing
international interconnections,
including mixed public-private
business models and
innovative payment schemes
such as Power Purchase
Agreements and Financial
Transmission Rights, which
enhance investment confidence
and market efficiency [9], [12],
[24]. Empirical analyses
demonstrate the effectiveness
of public financial support in
bridging viability gaps for
large-scale projects [12].
The literature presents
sophisticated risk assessment
models incorporating
stochastic elements and
market volatility, addressing
price risks and investment
uncertainties [8], [11], [15].
Cooperative game theory
applications anticipate
coalition stability and risk
mitigation in expansion
planning [16].
Weaknesses
Despite these advances,
financing mechanisms often
face challenges due to
regulatory fragmentation and
insufficient harmonization
across jurisdictions, limiting
scalability and replicability
[27], [30]. The complexity of
cost allocation in meshed
networks and the lack of
transparent, universally
accepted payment models
hinder broader adoption [28],
[34].
However, risk frameworks
frequently rely on assumptions
that may not capture
real-world political and market
dynamics, such as information
asymmetry and policy shifts
[8], [11]. The limited empirical
testing of proposed
risk-sharing mechanisms
constrains their practical
validation, and small market
participants remain vulnerable
to price volatility [15].
1.4 Conclusion
The body of literature on international electricity interconnections reveals a multifaceted
and evolving landscape where financing, risk management, state participation, benefit
allocation, and institutional frameworks are deeply intertwined. Financing mechanisms
predominantly emphasize the importance of mixed public-private models that leverage
a variety of instruments, including power purchase agreements, financial transmission
rights, and tradable certificates. These financial arrangements serve not only to bridge
viability gaps but also to align incentives and hedge against market uncertainties, thereby
fostering investment confidence. However, financing efforts face persistent challenges due
to regulatory fragmentation and the absence of universally accepted cost allocation frame-
works, which limit the scalability and replicability of cross-border projects. Overall, the
literature underscores that advancing international electricity interconnections demands
9
==End of OCR for page 12==
==Start of OCR for page 13==
integrated approaches that reconcile economic efficiency, risk mitigation, and equitable
benefit sharing within politically feasible governance models. Future efforts should pri-
oritize empirical validation of theoretical mechanisms, enhanced policy harmonization,
and inclusive institutional innovations to realize the full potential of sustainable and
cooperative cross-border electricity markets.
10
==End of OCR for page 13==
==Start of OCR for page 14==
Bibliography
[1] Y. Zhang, X. Zhao, H. Yuan, J. Wang, Y. Ze, and K. Zhang, “Key market mech-
anisms for cross-regional tradings in the electricity market: Insights from theory
and real-world implementations", IEEE Access, 2024. DOI: 10.1109/access.2024.
3428310.
[2] D. Borge-Diez, E. Rosales-Asensio, P. Cabrera, P. Sarmento, and J. A. Carta,
“Cross-border electricity cooperation in southern asia: Consequences and benefits",
Processes, 2024. DOI: 10.3390/pr12112324.
[3] M. O. Oseni and M. G. Pollitt, "Institutional arrangements for the promotion of
regional integration of electricity markets: International experience”, Social Science
Research Network, Tech. Rep., 2014.
[4] A. Singh, “Prospects for regional cooperation on cross-border electricity trade in
south asia", Social Science Research Network, Tech. Rep., 2013.
[5] A. Mezősi, E. Kácsor, and A. Diallo, “Projects of common interest? evaluation of
european electricity interconnectors”, Utilities Policy, 2023. DOI: 10.1016/j.jup.
2023.101642.
[6] G. T. I. D. Curiel and D. Chattopadhyay, “Regional electricity trade in latin america
without expanding generation capacities”, The Energy Journal, 2024. DOI: 10.5547/
2160-5890.13.1.gtim.
[7] N. Naval and J. M. Yusta, “Assessment of cross-border electricity interconnection
projects using a meda method”, International Journal of Critical Infrastructure
Protection, 2024. DOI: 10.1016/j.ijcip.2024.100703.
[8] E. R. van Beesten, O. K. Adnanes, H. M. Linde, P. Pisciella, and A. Tomasgard,
"Welfare compensation in international transmission expansion planning under un-
certainty", 2022. arXiv: 2205.05978 [math.OC].
[9] A. Iliceto, Business models for new interconnections: Allocation of costs, benefits
and risks, 2012.
[10] M. Kristiansen, F. D. Munoz, S. S. Oren, and M. Korpås, "A mechanism for al-
locating benefits and costs from transmission interconnections under cooperation:
A case study of the north sea offshore grid”, The Energy Journal, 2018. DOI: 10.
5547/01956574.39.6.MKRI.
[11] D. Huang and D. van Hertem, “Cross-border electricity transmission network invest-
ment: Perspective and risk framework of third party investors", Energies, vol. 11,
no. 9, p. 2376, 2018. DOI: 10.3390/EN11092376.
[12] D. Sasaki and M. Nakayama, “Effectiveness of public financial support in an elec-
tricity transmission project between iceland and the uk”, Business and Management
Studies, vol. 2, no. 2, 2016. DOI: 10.11114/BMS.V2I2.1518.
11
==End of OCR for page 14==
==Start of OCR for page 15==
[13] H. P. A. Knops and H. M. de Jong, “Merchant interconnectors in the european
electricity system”, Competition and Regulation in Network Industries, vol. 6, no. 4,
2005. DOI: 10.1177/178359170500600403.
[14] L. Xiangrui, S. Liu, C. Qinggui, Z. Maolin, M. Chunfeng, and P. He, “Research
on power trade arrangement and risk management in south and southeast asia”, in
Journal of Physics: Conference Series, vol. 1754, 2021, p. 012077. DOI: 10.1088/
1742-6596/1754/1/012077.
[15] K. S. Usher and B. McLellan, “Price risk exposure of small participants in liberalized
multi-national power markets: A case study on the belize-mexico interconnection",
Energies, vol. 17, no. 14, p. 3464, 2024. DOI: 10.3390/en17143464.
[16] "Enhancing the stability of coalitions in cross-border transmission expansion plan-
ning", IEEE Transactions on Power Systems, 2022. DOI: 10.1109/tpwrs.2021.
3124988.
[17] X. Yang, L. Ma, and G. Gao, “Research on the key mechanism of transnational
electric power trade”, in 2019 International Conference on Financial Management
and Economic Science (FMESS 2019), 2019. DOI: 10.23977/FMESS.2019.002.
[18] S. Hagspiel, “Reliable electricity: The effects of system integration and cooperative
measures to make it work", Research Papers in Economics, Tech. Rep., 2017.
[19] J. Li, G. Gao, L. Ma, T. Zhao, Q. Haoyuan, and F. Chen, “Analysis of profit models
for cross-border power interconnection projects", Global Energy Interconnection,
2019. DOI: 10.1016/J.GLOEI.2019.11.021.
[20] O. Erhahon, M. O. Oseni, and I. Ehanmo, “An outlook on a future-proof regu-
lated cross-border electricity market in africa”, in Renewable Energy for Sustainable
Growth Assessment, Springer, 2024. DOI: 10.1007/978-3-031-52677-0_15.
[21] I. Vokony, P. Sores, B. Nemeth, and B. Hartmann, “Market design for cross-border
co-optimised energy-reserve allocation”, Renewable Energy & Power Quality Jour-
nal, 2023. DOI: 10.24084/repqj21.289.
[22] Y. Zhao, J. Xiang, J. Xu, J. Li, and N. Zhang, "Study on the comprehensive ben-
efit evaluation of transnational power networking projects based on multi-project
stakeholder perspectives", Energies, vol. 12, no. 2, p. 249, 2019. DOI: 10.3390/
EN12020249.
[23] I. Andročec, “Impact of cross-border electricity trading on regional market partici-
pants", Ph.D. dissertation, University of Zagreb, 2012.
[24] R. Green, D. P. I. Staffell, and G. Strbac, "Market design for long-distance trade
in renewable electricity”, The Energy Journal, 2016. DOI: 10.5547/01956574.37.
SI2.AGIA.
[25] D. Huang et al., “Mind the gap: Challenges and policy options for cross-border
transmission network investments", in 2016 13th International Conference on the
European Energy Market (EEM), 2016. DOI: 10.1109/EEM.2016.7521211.
[26] J. G. Dedecca, “Offshore grid development as a particular case of tep", in Offshore
Transmission Grids, Springer, 2021. DOI: 10.1007/978-3-030-49428-5_5.
[27] K. Buchmann, A. Jones, Y. Zhang, and J. Schönecker, "Key challenges in crossbor-
der interconnector finance”, Journal of Sustainable Finance and Investment, 2021.
DOI: .1080/20430795.2021.1872347.
12
==End of OCR for page 15==
==Start of OCR for page 16==
[28] H. Nylund and J. Egerer, “Regional versus bilateral cost sharing in electricity trans-
mission expansion", in 2013 10th International Conference on the European Energy
Market (EEM), 2013.
[29] F. Kimura and H. Phoumin, "Energy market integration in east asia: Energy trade,
cross border electricity, and price mechanism”, Research Papers in Economics, Tech.
Rep., 2013.
[30] D. H. J. Egerer, “National-strategic investment in european electricity transmission
capacity", Ph.D. dissertation, Delft University of Technology, 2013.
[31] A. Ramos, “Fundamentos para la constitución de un mercado común de electrici-
dad", Research Papers in Economics, Tech. Rep., 2004.
[32] M. T. Maung, R. Senga, P. P. Aung, S. Zenobi, and S. Thorncraft, “Towards a green
and inclusive power sector in the greater mekong subregion”, in IOP Conference
Series: Earth and Environmental Science, vol. 1395, 2024, p. 012017. DOI: 10.
1088/1755-1315/1395/1/012017.
[33] T. Zhao et al., “Index system and methods for comprehensive assessment of cross-
border power grid interconnection projects", Global Energy Interconnection, 2020.
DOI: 10.1016/J.GLOEI.2021.01.006.
[34] G. Zachmann, "Electricity without borders: A plan to make the internal market
work", Bruegel Blueprint Series, Tech. Rep. 20, 2013.
[35] V. Venizelou and A. Poullikkas, “Trend analysis of cross-border electricity trading
in pan-european network", Energies, vol. 17, no. 21, p. 5318, 2024. DOI: 10.3390/
en17215318.
[36] C. C. Karahan, A. Odabasi, and C. S. Tiryaki, “Wired together: Integration and
efficiency in european electricity markets", Energy Economics, 2024. DOI: 10.1016/
j.eneco.2024.107505.
13
==End of OCR for page 16==
==Start of OCR for page 1==
ISCI
INSTITUTO
SISTEMAS COMPLEJOS
DE INGENIERÍA
02 de Octubre 2025
Santiago, Chile.
Interconexión en América Latina:
Desarrollo de un marco cooperativo
para la interconexión regional
Reunión de Avance
Rodrigo Moreno, Gerardo Blanco, Miguel Ramírez, Felipe Sepúlveda
Preparado para:
European
Climate
Foundation
==End of OCR for page 1==
==Start of OCR for page 2==
Agenda
ISCI
INSTITUTO
SISTEMAS COMPLEJOS
DE INGENIERÍA
COVIO-19
1. Contexto
2. Objetivos
3. Experiencia internacional
4. Revisión de literatura
5. Identificación de Brecha
6. Cuantificación de necesidades de
interconexión
==End of OCR for page 2==
==Start of OCR for page 3==
ISCI
Objetivos
Objetivo General: Evaluar y proponer soluciones prácticas, enfocadas en cuantificar y
proponer esquemas de reparto de beneficios e identificar mecanismos de remuneración de
infraestructura para la interconexión eléctrica regional en América Latina.
Objetivos Específicos:
•
•
•
•
•
Ampliar el rango de escenarios analizados, profundizando en la cuantificación de
beneficios técnicos y económicos de la integración eléctrica, como continuidad del
proyecto previo.
Analizar y comparar los marcos de asignación de costos y beneficios aplicados a
proyectos de interconexión eléctrica internacional, examinando sus metodologías de
cuantificación y mecanismos de remuneración.
Analizar y comparar los marcos de asignación de costos y beneficios eléctrica
propuestas en el estado del arte académico, examinando sus metodologías de
cuantificación y mecanismos de remuneración.
Comparar y evaluar las ventajas y desventajas de las alternativas identificadas y
diseñadas, bajo distintos escenarios de integración regional.
Generar recomendaciones sobre interconexiones prioritarias y esquemas prácticos de
cooperación técnica y económica.
3
==End of OCR for page 3==
==Start of OCR for page 4==
!
ISCI
Experiencia internacional
4
==End of OCR for page 4==
==Start of OCR for page 5==
ISCI
¿Cómo analizaremos la información?
Enfoque del análisis: en cada caso de estudio explicaremos como se impulsan
y sustentan las inversiones en interconexiones, dando respuesta a las siguientes
preguntas:
• ¿Quién lo paga? -> identificar el/los organismos financistas.
•
¿Cómo se paga? -> identificar como se recupera la inversión.
• ¿Quién toma los riesgos? -> identificar sobre cuales organismos recaen.
•
¿Cómo participaron los Estados? -> identificar el nivel de coordinación.
•
¿Hay traspaso de beneficios/compensaciones entre miembros?
identificar traspasos.
5
==End of OCR for page 5==
==Start of OCR for page 6==
•
•
•
•
•
•
Taxonomías identificadas en los casos de estudio
¿Quién lo paga?
TSO/Transmisor
nacional
(ingreso regulado vía
tarifa)
SPV/Concesión
privada o mixta
(equity +
deuda/project
finance)
Empresa regional
(SPV regional)
Offtaker / Utility
•
•
•
•
(PPA/peaje dedicado).
Estados/Tesoros
(aportes directos)
Multilaterales / Fondos
•
climáticos / Programas •
supranacionales
ISCI
¿Cómo se
paga?
Tarifa de dos partes; fijo +
variable,
con cargos de balance
para cubrir residual
Rentas de congestión /
CVT; Peajes por MWh;
Wheeling
DTs (Derechos de
Transmisión)
financieros/firmes
Cargo Complementario
(CC) / True-up regulatorio
•
•
•
•
•
CBA (benefit-based); CBCA.
(UE); Side-payments
PPA take-or-pay /
capacidad; Peaje dedicado
Subsidios/cofinancios
(CEF/BID/CAF/BM); Grants
•
•
¿Quién toma
los riesgos?
TSO / Transmisor
regulado
SPV/Concesionario
(PPP) / Empresa regional
Offtaker / Utility /
Comprador en PPA
Agentes de mercado
(generadores,
comercializadores,
grandes consumidores)
Estado / Regulador
Bancos multilaterales /
ECAs / Bonistas
Contratista EPC
Operador/O&M (distinto
del propietario)
¿Cómo participaron
los Estados?
¿Hay traspaso de
beneficios /
compensaciones?
Regulados y ex-
ante (benefit-
based)
Contractuales
•
Supranacional ->
Organismo con autoridad
en lo delegado
(planificación, pago y
operación).
•
•
Bilateral -> Acuerdo entre •
dos países,
ex-post
reglas caso a caso; cada
uno financia su tramo.
•
•
•
Multilateral ->
Coordinación varios
países,
estándares mínimos; sin
autoridad fuerte.
•
Operacionales /
Mecanismos de
balance interno
Apoyos públicos
(no país país,
pero reducen lo a
compensar)
6
==End of OCR for page 6==
==Start of OCR for page 7==
+
Mecanismos de asignación de costos y beneficios en interconexiones eléctricas
ICELAND
transfronterizas: Aplicaciones práctica.
FINLAND
RUSSIA
CANADA
UNITED
STATES
MEXICO
CUBA
4
GUATEMALA
PANAMA
VENEZUELA
COLOMBIA
GUYANA
ECUADOR
U
BRAZIL
BOLIVIA
PARAC M
CHILE
URUGUAY
ARGENTINA
NORWAY
SWEDEN
UNITED
KINGDOM
DENMARK
IRELAND
4
BELARUS
POLAND
BELGIUM
UKRAINE
AUSTRIA
FRANCE
ROMANIA
ITALY BULGARIA
SPAIN
GREECE
TURKEY
TUNISIA
MOROCCO
ALGERIA
KAZAKHSTAN
MONGOLIA
UZBEKISTAN
TURKMENISTAN
SYRIA
AFGHANISTAN
IRAQ
IRAN
ISRAEL
PAKISTAN
NEPAL
LIBYA
EGYPT
SAUDI
ARABIA
UNITED
ARAB
BANGLAD
EMIRATES
INDIA
MAURITAΝΙΑ
NIGER
SENEGAL
MALI
BURKINA
GUINEA FASO
GHANA
CHAD
ERITREA YEMEN
SUDAN
NIGERIA
ETHIOPIA
SOUTH
SUDAN
LIBERIA
CAMEROON
KENYA
GABON
RWANDA
TANZANIA
ANGOLA
ZAMBIA
MOZAMBIQUE
NAMIBIA
SOUTH
AFRICA
NORTH
KOREA
SOUTH
KOREA
CHINA
TAIWAN
LAOS
MYANMAR
VIETNAM
CAMBODIA
PHILIPPINES
4
SRI LANKA
MALAYSIA
INDONESIA
AUS
Leaflet OpenStreetMap contributors CARTO
==End of OCR for page 7==
==Start of OCR for page 8==
Casos analizados
Europa
LAC
Asia
•
UE (PCI/CBCA): Regulación y CBA estandarizado para interconexiones.
•
•
•
•
•
•
•
•
NSEC: Marco de cooperación (nueve países + UE); despliegue offshore wind e
interconexiones.
SINEA / MAERCP: Iniciativa de interconexión región andina (implementación parcial).
Colombia-Panamá: Interconexión binacional con reglas de reguladores de cada país
CREG en CO-ASEP en PA.
Itaipú HVDC (Brasil): Enlace nacional que integra Itaipú a Brasil.
SIEPAC / MER: Red regional + mercado eléctrico (Nicaragua, Guatemala, Panamá, El
Salvador, Hondura, y Costa Rica); Gobernanza Supranacional (Regulador CRIE
Operador EOR).
-
GMS: Red de interconexiones entre Camboya, Laos, Myanmar, Tailandia, Vietnam (y sur
de China), Gobernanza intergubernamental.
BBIN: Red de enlaces para exportar hidro de Bután/Nepal a India y Bangladesh vía India,
principalmente bilateral con pasos hacia un marco subregional común.
Laos-Tailandia: Enlace TSO-TSO entre Laos con EGAT (Tailandia) para exportar energía,
principalmente de proyectos hidro laosianos.
Fuentes: European Union, 2013; ENTSO-E, 2015; ENTSO-E, 2022; European Commission/NSEC, 2024; Andean Community, 2017; Echevarría, Jesurun-Clements, Díaz & Trujillo, 2017; CREG & ASEP, 2025;
Itaipú Binacional, 1973; Maung, Senga, Aung, Zenobi & Thorncraft, 2024; Sharma, Phoumin, Sharma & Nepal, 2024; International Rivers, 2013; SEC (Thailand), 2023; Kristiansen, Muñoz, Oren & Korpås, 2018.
9
==End of OCR for page 8==
==Start of OCR for page 9==
Análisis - ¿Quién lo paga?
¿Quién lo paga?
Fortalezas
Debilidades
TSO/Transmisor
nacional (tarifa
regulada)
Bancariza fácil; costo de
capital bajo; supervisión
conocida
Ring-fencing de riesgos;
SPV/Concesión (PPP) – atrae inversión privada;
pagos por disponibilidad
equity + deuda
Empresa regional (SPV
regional)
Offtaker / Utility (PPA,
peaje dedicado)
Estados/Tesoros
(aportes directos)
con KPIs
Vehículo único
multinacional;
neutralidad; facilita
banca multilateral
Traslada riesgo de
volumen al comprador
(take-or-pay); cierra caja
sin tarifa nacional
Acelera cierres
financieros; baja tarifas
iniciales
Préstamos blandos y
¿Cómo funciona mejor?
Poca señal regional;
Cuando el enlace entra al
usualmente sin reparto de plan nacional y hay marco
CAPEX entre países
Mayor complejidad
contractual; costos de
transacción
Requiere gobernanza
regional; procesos más
lentos
Puede encarecer tarifa del
offtaker; dependencia
contractual
Espacio fiscal limitado;
riesgo político
Multilaterales / Fondos
Condiciones y tiempos de
climáticos / Programas grants; reducen CAPEX a aprobación; no sustituyen
supranacionales
recuperar
ingresos del activo
tarifario estable
Cuando se busca project
finance con canon fijo y
penalidades de
indisponibilidad
Con
tratado/regulador/operador
regional y tarifa two-part
(fijo + variable)
Donde el comercio es
bilateral y el enlace está
atado a contratos de
energía/capacidad
Proyectos estratégicos o
con beneficios públicos
amplios
Complementando TSO/SPV
con cofinancios (blends)
Caso de estudio
HVDC Brasil (Itaipú, foco
cable); SINEA (cada país su
tramo); Colombia-Panamá
(cada TSO su tramo); UE (PCI)
usualmente vía TSOs
Asia (GMS/BBIN) en varios
proyectos PPP/SPV (caso a
caso)
SIEPAC – EPR propietaria;
recuperación vía IARM/CC +
CVT/DTS
Asia (GMS/BBIN); esquemas
bilaterales en LAC (wheeling +
PPAs)
SIEPAC (apoyos iniciales)
UE-CEF/PCI (cofinancia);
SIEPAC (BID/BCIE/España)
10
==End of OCR for page 9==
==Start of OCR for page 10==
Análisis - ¿Cómo se paga?
¿Cómo se paga?
Tarifa de dos partes (fijo +
variable por uso)
Cargos variables por uso (Rentas
de congestión/CVT; Peajes por
MWh; Wheeling)
Fortalezas
Bancariza (fijo) y da
señal eficiente
(variable)
Señaliza escasez
espacial y uso real;
simple de liquidar
Cobertura del riesgo de
DTs (Derechos de Transmisión) congestión; aportan
ingresos al sistema
CC / True-up regulatorio (cargo de
balance del fijo)
ACBB/CBCA-UE /
Compensaciones bilaterales (CB)
(pagos fijos entre países por
beneficios)
PPA take-or-pay / pago por
capacidad / peaje dedicado
Subsidios/cofinancios
(CEF/BID/CAF/BM; grants)
Asegura recuperar el
fijo cuando el variable
no alcanza
Alinea pagos con
beneficios; corrige
asimetrías
transfronterizas
Traslada riesgo de
volumen al offtaker;
cierra caja sin
depender de tarifas
Reduce CAPEX a
recuperar; mejora
bancabilidad
Debilidades
Requiere buen diseño y
medición; puede ser
percibida como compleja
Ingresos volátiles; solos no
cubren la inversión
Requiere mercado
organizado y reglas claras;
no sustituyen el fijo
Puede diluir señales de
inversión si se usa
siempre; sensibilidad
política
Estudios/negociación
intensivos; uso limitado en
la práctica
Dependencia contractual y
riesgo de contraparte;
puede encarecer tarifa del
offtaker
No son ingresos
operativos;
tiempos/condiciones
¿Cómo funciona mejor?
Cuando hay operación con
precios nodales/congestión y
necesidad de cubrir CAPEX
estable
Caso de estudio
UE (TSOS); SIEPAC
(estructura de facto:
IARM/CC + CVT)
En mercados con congestión SIEPAC (CVT); LAC/Asia
efectiva o intercambio bilateral (wheeling/peajes); UE
(rentas de congestión)
con tránsito
Donde hay diferencias nodales
y agentes que desean hedge
Como "red de seguridad” del
fijo, con revisiones periódicas y
tope
Proyectos con beneficios muy
asimétricos y gobernanza
regional mínima razonable
En enlaces ligados a contratos
de energía/capacidad y
comercio bilateral
Como complemento a
cualquiera de los métodos
anteriores
SIEPAC y UE (DTs
financieros)
SIEPAC (CC para cerrar
IARM)
UE (CBCA en PCI);
opcional en LAC/Asia
(ACBB/CB)
Asia (GMS/BBIN) y
bilaterales LAC
UE (CEF/PCI); SIEPAC
(multilaterales)
11
==End of OCR for page 10==
==Start of OCR for page 11==
Análisis - ¿Quién toma los riegos?
¿Quién toma los
riesgos?
TSO/Transmisor
regulado
SPV/Concesionario
Fortalezas
Debilidades
Señal regional limitada;
expuesto a cambios
regulatorios
Complejidad
(PPP) / Empresa regional claros (KPIs/penalidades) contractual/financiera
Offtaker / Utility (PPA)
Agentes de mercado
(gen/comercializadores/
clientes)
Estado / Regulador
Bancos multilaterales /
ECAs / Bonistas
Contratista EPC
Capacidad técnica;
respaldo tarifario
Ring-fencing; contratos
Riesgo de
Gestionan riesgo con
DTs/hedges
Asume volumen/precio;
cierra caja
Reduce riesgo político;
habilita permisos
Mejora costo/plazo de
deuda; disciplina
financiera
demanda/contraparte
Exposición a
congestión/precio
Presión fiscal/política
¿Cómo funciona mejor?
Caso de estudio
Con ingreso regulado y
penalidades por disponibilidad
HVDC Brasil (cable); SINEA;
Col–Pan; UE (TSOs)
Con pago por disponibilidad y SIEPAC (EPR); varios PPP en
garantías acotadas
Con take-or-pay/capacidad y
pass-through a tarifa
En mercados con precios
nodales y DTs disponibles
Con marco estable, solución de
controversias y, si aplica,
subsidios
Covenants y tiempos de Como blends con TSO/SPV y
aprobación
garantías limitadas
Cambios son costosos;
precio/plazo/performance riesgo de obra
Asegura
(LSTK)
Operador/O&M (si
Enfocado en
distinto del propietario) disponibilidad y KPIs
Con contrato llave en mano +
LDs y garantías
concentrado
No controla
ingresos/regulación
Con contratos O&M con
penalidades y SLA
Asia
Asia (GMS/BBIN); bilaterales
LAC
SIEPAC (CVT/DTs); UE
(rentas/DTs)
UE (marco TEN-E/PCI);
SIEPAC (CRIE/EOR)
SIEPAC (multilaterales);
proyectos PPP Asia
Itaipú-HVDC (contratos EPC)
SIEPAC (EOR opera sistema /
EPR O&M); Brasil (ONS
sistema / dueño O&M)
ISCI
12
==End of OCR for page 11==
==Start of OCR for page 12==
Análisis - ¿Cómo participaron los estados?
¿Cómo
participaron los
Estados?
Supranacional
(tratado +
regulador/operador
regional con
autoridad
delegada)
Bilateral (acuerdo
entre dos países,
reglas caso a caso)
Multilateral de
coordinación
(varios países,
estándares
mínimos, sin
autoridad fuerte)
ISCI
Fortalezas
Reglas comunes,
planificación coordinada,
posibilidad de
tarifas/mecanismos
regionales; mayor
certidumbre
Simplicidad; tiempos más
cortos; control nacional de
tarifas y activos
Flexibilidad; facilita pilotos
y pasos graduales
Debilidades
¿Cómo funciona mejor?
Caso de estudio
Procesos más lentos;
negociación compleja;
riesgo de burocracia
Poca armonización;
normalmente sin reparto
de CAPEX; señales
regionales débiles
No asegura
CBCA/benefit-sharing;
cada país financia
localmente; ejecución
desigual
Cuando hay visión regional
clara, marco legal vigente y
necesidad de coordinar
inversión y operación (two-
part tariff, reglas de
congestión, DTs)
Cuando el intercambio es
principalmente entre dos
partes y cada TSO/país
puede financiar su tramo con
peajes/PPAs
Como plataforma para
compatibilizar normas
técnicas/comerciales y
habilitar wheeling/mercado
regional ligero
UE (TEN-E/ACER/ENTSO-E);
SIEPAC (CRIE/EOR, EPR)
Colombia-Panamá; enlaces
andinos puntuales
SINEA (Andino); GMS/BBIN
(Asia)
13
==End of OCR for page 12==
==Start of OCR for page 13==
Análisis - ¿Hay traspaso de beneficios/compensaciones?
¿Hay traspaso de
beneficios /
compensaciones?
ACBB (benefit-based) –
aportes fijos según CBA
CBCA-UE (mecanismo
formal europeo)
Compensaciones
bilaterales (CB / side-
payments)
Rentas de congestión /
CVT (compensación
operativa)
DTs (derechos de
transmisión)
Fortalezas
Alinea “quién paga” con
“quién gana"; corrige
asimetrías
Marco regulatorio claro;
puede obligar pagos
transfronterizos
Flexible y rápida; ajusta casos
puntuales
Señaliza uso y aporta
ingresos; reduce necesidad
de fijo
Hedean congestión;
canalizan ingresos al sistema
CC/True-up (cargo de Asegura cerrar el fijo cuando
balance del fijo)
Wheeling fees (pago a
país de tránsito)
Subsidios/cofinan-
ciamiento públicos (no
país país)
lo variable no alcanza
Compensa uso de red del
tránsito; simple
Reduce CAPEX a repartir;
mejora bancabilidad
Debilidades
Requiere CBA robusto y
negociación; costos
transaccionales
Uso efectivo acotado;
tiempos administrativos
Ad-hoc; poca
replicabilidad; riesgo
político
Volátil; no garantiza
cubrir CAPEX
Requiere mercado e
infraestructura
financiera
Puede diluir señales si
se vuelve permanente
No reparte CAPEX del
interconector; solo
operación
No sustituyen ingresos
operativos; dependen
de presupuestos
¿Cómo funciona mejor?
Cuando hay beneficios
claramente desbalanceados y
reglas mínimas comunes
Con gobernanza
supranacional (TEN-E/PCI) y
CBA paneuropeo
Cuando dos países acuerdan
cerrar brechas específicas de
beneficio
En mercados con precios
nodales y congestión efectiva
Donde agentes quieren
Caso de estudio
Propuesta genérica en
LAC/Asia; aplicable a
proyectos binacionales
Unión Europea (PCI)
Casos bilaterales puntuales
en LAC/Asia
SIEPAC (CVT); UE (rentas de
congestión)
cobertura y hay diferencias SIEPAC y UE (DTs financieros)
nodales
Como red de seguridad con
revisión periódica y topes
En comercio bilateral con
tránsito por terceros
Como complemento a
TSO/SPV o esquemas
ACBB/CBСА
SIEPAC (CC cierra IARM)
LAC/Asia (Col–Pan;
GMS/BBIN)
UE (CEF/PCI); SIEPAC
(multilaterales)
14
==End of OCR for page 13==
==Start of OCR for page 14==
! Unión Europea – (PCI/CBCA + CBA ENTSO-E) (1/2)
¿Quién lo paga?
•
•
•
CAPEX/OPEX: TSO/promotor.
Países no anfitriones: pueden cofinanciar parte del CAPEX del anfitrión mediante
decisión CBCA.
Fondos UE: posible subvención del mecanismo presupuestario de Europa (CEF) (para
estudios/obras) si el proyecto es de interés común (PCI).
¿Cómo se paga?
•
•
CBCA: asigna por beneficios (CBA ENTSO-E) y, como mínimo, compensa perjuicios
netos del anfitrión (compensación por daños de la Agencia de la Unión Europea para la
Cooperación de los Reguladores de la Energía ACER).
Ingresos de operación: rentas de congestión y/o peajes según regulación; pueden
destinarse a reducir cargos o financiar refuerzos.
ISCI
15
==End of OCR for page 14==
==Start of OCR for page 15==
! Unión Europea – (PCI/CBCA + CBA ENTSO-E) (2/2)
¿Quién toma los riesgos?
•
•
•
Construcción/costo/plazo: TSO (con ingreso permitido regulado); riesgo mitigado por
elegibilidad PCI/CEF.
Demanda/volumen/precio: el TSO no asume riesgo merchant (ingresos regulados).
Regulatorio: compartido entre ARN; arbitraje por ACER si hay desacuerdo.
¿Cómo participaron los Estados?
•
•
•
Nivel: supranacional (Reglamento TEN-E define marco supranacional para
desarrollar infraestructura transfronteriza, estados respetan estas reglas).
Gobernanza: Comisión Europea (PCI/CEF), ARN coordinadas y ACER (decisión CBCA si
no hay acuerdo).
Trámite: promotores → ARN nacionales (6 meses); si no hay acuerdo, decide ACER.
¿Hay traspaso de beneficios / compensaciones entre miembros?
•
•
Sí, por CAPEX: CBCA puede transferir costos a países beneficiarios no anfitriones (sobre
todo para neutralizar impactos negativos).
Sí, por operación: rentas de congestión/peajes se reparten o aplican a reducir
cargos/financiar ampliaciones.
ISCI
16
==End of OCR for page 15==
==Start of OCR for page 16==
ISCI
Europa - La Cooperación Energética de los Mares del Norte
(NSEC) y Proyectos Híbridos Offshore (1/2)
¿Quién lo paga?
•
•
•
CAPEX/OPEX: TSO/promotor.
Países beneficiarios (no anfitriones) con aportes CBCA/acuerdos cuando hay
asimetrías de beneficios.
Unión Europea (CEF) cuando hay subvención PCI (cubre una parte del CAPEX).
¿Cómo se paga?
•
•
•
Reparto de CAPEX por beneficios (desviación del 50/50 cuando el CBA muestra
asimetrías).
Acuerdos voluntarios entre países de la misma cuenca (NSEC) que fijan claves de
reparto.
Ingresos de operación: rentas de congestión y/o peajes según regulación; se usan para
reducir cargos o financiar refuerzos.
17
==End of OCR for page 16==
==Start of OCR for page 17==
ISCI
Europa - La Cooperación Energética de los Mares del Norte
(NSEC) y Proyectos Híbridos Offshore (2/2)
¿Quién toma los riesgos?
•
•
•
Construcción/tecnología offshore/híbrida: TSOs/promotores (riesgo alto, mitigado por
acuerdos y elegibilidad UE).
Demanda/volumen/precio: riesgo acotado para TSOs si hay ingreso regulado; las
rentas dependen del uso real.
Regulatorio/político: compartido; exige consenso político entre Estados ribereños.
¿Cómo participaron los Estados?
•
•
Nivel: regional por cuenca (NSEC) + marco UE (TEN-E).
Gobernanza: acuerdos voluntarios entre países NSEC para planificación, reparto de
costos y normas; la Comisión/ACER/ENTSO-E proveen guías y metodología CВА.
¿Hay traspaso de beneficios / compensaciones entre miembros?
•
•
Sí (por CAPEX): repartos según beneficios calculados (cuando hay asimetrías
relevantes).
Sí (por operación): rentas de congestión entre países; aplicación a reducción de
cargos/financiar ampliaciones.
18
==End of OCR for page 17==
==Start of OCR for page 18==
ISCI
Sudamérica – HVDC (6.300 MW) Itaipú (1/2)
¿Quién lo paga?
•
•
CAPEX/OPEX del HVDC: usuarios de la red en Brasil vía tarifas de transmisión reguladas.
Exportador/Paraguay: no paga el CAPEX del enlace HVDC (el activo está en Brasil).
¿Cómo se paga?
•
•
Mecanismo: ingreso regulado de transmisión (RAP/"allowed revenue") definido por el
regulador brasileño; se recauda vía cargos de uso de la red (peajes TUST) y se liquida al
propietario (Furnas/Eletrobras).
Uso/energía: los flujos comerciales de Itaipú se transan aparte (régimen del tratado); no hay
peaje transfronterizo aplicado a Paraguay por el HVDC.
¿Quién toma los riesgos?
•
•
•
•
Construcción y tecnología HVDC: Furnas (contratos EPC/proveedores), con respaldo
regulatorio para remuneración del activo una vez en servicio.
Demanda/volumen: bajo para la empresa (regulado, ingreso independiente del flujo).
Disponibilidad: empresa enfrenta penalidades por indisponibilidad (desempeño).
Regulatorio: riesgo de ciclos tarifarios y WACC regulado (Brasil).
•
Paraguay no asume riesgo del enlace; su exposición es por el régimen de energía del tratado.
19
==End of OCR for page 18==
==Start of OCR for page 19==
•
•
Sudamérica – HVDC (6.300 MW) Itaipú (2/2)
¿Cómo participaron los Estados?
•
Brasil: definición regulatoria y tarifaria (ANEEL), operación del sistema (ONS), propiedad
pública/mixta (Eletrobras/Furnas), permisos y servidumbres.
Paraguay: sin cofinanciar el HVDC; su participación es vía el Tratado de Itaipú (generación,
cesión de energía, royalties).
Bilateralidad: el tratado viabiliza el flujo 50→60 Hz; el link HVDC es infraestructura nacional
brasileña que convierte e inyecta en São Paulo.
¿Hay traspaso de beneficios / pagos entre miembros por el enlace?
•
Por el HVDC, no. No existe CBCA ni pagos de Paraguay→Brasil por el CAPEX del enlace.
•
Transferencias bilaterales sí existen, pero son del régimen de generación (pago por energía
cedida y royalties del tratado), no por la interconexión HVDC.
ISCI
20
==End of OCR for page 19==
==Start of OCR for page 20==
ISCI
•
•
Sudamérica - Integración Subregional: El Sistema de
Interconexión Eléctrica Andina (SINEA) (1/2)
¿Quién lo paga?
•
•
•
CAPEX/OPEX (fijo): cada país financia su tramo (base tarifaria nacional).
Uso de la red para exportar: lo paga el agente exportador a su país exportador vía Peaje
Unitario (cargo ex-ante y transparente).
Importador: paga la energía en el despacho coordinado (solo si importar ≤ costo local).
¿Cómo se paga?
Energía: mercado de excedentes con despacho económico coordinado (precio de
intercambio ≤ costo marginal interno del importador).
Transmisión (lado exportador): Peaje Unitario regulado y conocido antes del despacho para
que entre en el cálculo económico.
21
==End of OCR for page 20==
==Start of OCR for page 21==
Sudamérica - Integración Subregional: El Sistema de
Interconexión Eléctrica Andina (SINEA) (2/2)
¿Quién toma los riesgos?
•
•
•
•
Construcción/tecnología de interconexión: cada TSO/país sobre su tramo.
Demanda/volumen: bajo, solo se comercia excedente; si no conviene, no hay transacción.
Ingresos de uso de red: el Peaje Unitario da previsibilidad al exportador; sin garantía
regional de volumen.
Regulatorio: nacional (cada país fija su peaje), coordinación regional solo para el despacho.
¿Cómo participaron los Estados?
•
Gobernanza: Coordinador Regional rotativo (2 años) para despacho y la liquidación.
•
Nivel: subregional (con apoyo de comunidad andina (CAN) y BID).
•
Armonización: marco común mínimo; peajes siguen siendo nacionales.
¿Hay traspaso de beneficios / compensaciones entre miembros?
•
Explícitas por CAPEX: no (no hay CBCA regional en lo aportado).
•
Por uso/operación: sí, vía pagos de energía (el importador compra más barato que su costo
local) y peaje unitario al exportador (remunera su red).
ISCI
22
==End of OCR for page 21==
==Start of OCR for page 22==
ISCI
Sudamérica - Acuerdos Bilaterales Específicos: La
Interconexión Colombia-Panamá (1/2)
¿Quién lo paga?
•
•
•
CAPEX/OPEX: cada país su tramo nacional por su empresa de transmisión responsable (ISA
en Colombia y ETESA en Panamá) con recuperación tarifaria nacional.
¿Cómo se paga?
Operación/comercio:
corto y largo plazo; precios por
reglas bilaterales para
mercado/contratos bajo principios de beneficio mutuo.
Uso de red: peajes/wheeling definidos por cada regulador (CREG en Colombia/ASEP en
Panamá) y aplicados a las transacciones.
•
CAPEX: se maneja por fuera del acuerdo regulatorio.
23
==End of OCR for page 22==
==Start of OCR for page 23==
ISCI
Sudamérica - Acuerdos Bilaterales Específicos: La
Interconexión Colombia-Panamá (2/2)
¿Quién toma los riesgos?
•
•
•
•
Construcción/plazo/costo: TSOs en sus tramos; mitigado por remuneración regulada nacional.
Demanda/volumen/precio: sin garantía binacional de volumen; depende de transacciones
spot/contratos.
Disponibilidad: estándares/penalidades definidas por el acuerdo y por regulación nacional.
Regulatorio: compartido; Comité Binacional de Reguladores resuelve diferencias.
¿Cómo participaron los Estados?
•
•
•
Nivel: bilateral entre CREG (Colombia) y ASEP (Panamá).
Gobernanza: Comité Binacional de Reguladores para supervisión, reglas operativas y
resolución de disputas.
Enfoque: el acuerdo se centra en operación y comercio, no en financiamiento de inversión.
¿Hay traspaso de beneficios / compensaciones entre miembros?
•
•
Pagos operativos: sí, vía energía (contratos/mercado) y peajes por uso de red en cada país.
Transferencias por CAPEX (side-payments CBCA): no, salvo pactos ad hoc entre TSOs.
24
==End of OCR for page 23==
==Start of OCR for page 24==
ISCI
Sudamérica - Integración en Centroamérica: El Proyecto
SIEPAC (1/2)
¿Quién lo paga?
•
•
•
•
•
CAPEX/OPEX de la red regional: la Empresa Propietaria de la Red (EPR).
Fuentes iniciales: multilaterales (BID, BCIE, Gobierno de España) + aportes de socios de la
EPR.
Recuperación vía tarifas: agentes del Mercado eléctrico regional (MER) (generadores,
comercializadores, grandes consumidores) vía cargos por uso de la red.
¿Cómo se paga?
Ingreso Autorizado Regional (IARM) = costos fijos (inversión, O&M) de la red SIEPAC.
Se recauda vía (two-part tariff):
Ο
CVT (Cargo Variable de Transmisión): refleja congestión/precio nodal en cada
transacción → financia operación/expansión.
• CC (Cargo Complementario): cubre el residual del IARM que no cubre el CVT ni derechos
de transmisión (DTs); se prorratea por energía retirada de la red regional por los agentes
del MER.
Peaje específico SIEPAC: definido, pero prácticamente 0 en la metodología vigente.
25
==End of OCR for page 24==
==Start of OCR for page 25==
Sudamérica - Integración en Centroamérica: El Proyecto
SIEPAC (2/2)
¿Quién toma los riesgos?
•
•
•
•
Construcción/financiamiento inicial: EPR (apalancada por BID/BCIE).
Demanda/volumen: Bajo; si no hay comercio, CC cubre IARM (residual)
Operación/disponibilidad: EPR/EOR con estándares y supervisión del regulador CRIE.
Regulatorio/político: compartido (Tratado Marco; CRIE como regulador supranacional).
¿Cómo participaron los Estados?
•
•
•
Nivel: supranacional regional (Tratado Marco ratificado por los 6 estados).
Gobernanza: CRIE (regulador) + EOR (operador/administrador del mercado).
Propiedad del activo: EPR con participación de empresas/entes de los seis países + socios.
¿Hay traspaso de beneficios / compensaciones entre miembros?
•
•
Sí, por operación: el CVT internaliza congestión y orienta quién paga/recibe según precios
nodales; además hay Derechos de Transmisión (cuando aplican).
Por costos fijos: el CC socializa el residual del IARM entre agentes del MER (beneficiarios del
sistema), no como transferencias Estado-Estado.
ISCI
26
==End of OCR for page 25==
==Start of OCR for page 26==
ISCI
Asia - La Red Eléctrica de la ASEAN (APG): Ambición,
Financiación y Desafíos (1/2)
¿Quién lo paga?
•
CAPEX de enlaces/APG: hoy proyecto a proyecto: gobiernos/TSOs nacionales,
•
•
OPEX: usuarios nacionales (tarifas reguladas del TSO).
Tránsito por tercer país: Agentes que transan pagan el uso a través de cargo de
wheeling definido nacionalmente por el país de tránsito.
¿Cómo se paga?
•
•
•
•
•
Contratos de energía: PPA "take-or-pay” que aseguran ingresos al proyecto.
Asociación público-privada (APP): pagos por disponibilidad o esquemas de ingreso
permitido según regulación local.
Blended finance: deuda concesional + capital privado; no hay aún metodología regional
de peajes/transito.
Banco multilateral de desarrollo (BMD): préstamos, garantías, y asistencia técnica
(catalizan inversión privada).
Fondo de Financiación APG (en diseño): subvenciones/aportes para cerrar viability
gaps y atraer capital privado.
27
==End of OCR for page 26==
==Start of OCR for page 27==
ISCI
Asia - La Red Eléctrica de la ASEAN (APG): Ambición,
Financiación y Desafíos (2/2)
¿Quién toma los riesgos?
•
•
•
•
Construcción/financiamiento: promotor (con mitigación por garantías públicas/BMD).
Demanda/volumen: a menudo trasladado al comprador vía PPA take-or-pay; si no hay
PPA, riesgo mayor del promotor.
Precio/ingresos: dependen de contratos y de peajes locales; al no existir mercado
regional, no hay cobertura por rentas transfronterizas.
Regulatorio/transito: alto; no hay reglas comunes para wheeling ni para acceso abierto.
¿Cómo participaron los Estados?
•
•
Nivel: intergubernamental, acuerdos se negocian caso a caso entre gobiernos.
Rol actual: priorizan movilizar financiamiento (fondo APG en diseño) y armonización
futura; comercio aún predominantemente bilateral.
¿Hay traspaso de beneficios / compensaciones entre miembros?
•
Operativas: pagos bilaterales por energía (PPA) y wheeling a países de tránsito.
28
==End of OCR for page 27==
==Start of OCR for page 28==
Asia – Comercio Eléctrico Subregional: GMS
¿Quién lo paga?
•
•
CAPEX/OPEX: promotores/TSO nacionales; financia BMD (ADB) con deuda; usuarios
nacionales vía tarifas.
Tránsito: país de tránsito cobra wheeling.
¿Cómo se paga?
•
Contratos bilaterales (PPA) + peajes nacionales; sin metodología regional común aún.
¿Quién toma los riesgos?
•
•
•
Construcción/financia: promotor/asociación público-privada (mitigado por garantías BMD).
Demanda/volumen: suele traspasarse al comprador vía take-or-pay.
Regulatorio/transito: alto; falta acceso abierto y reglas de peaje comunes.
¿Cómo participaron los Estados?
•
Nivel intergubernamental con apoyo banco asiático del desarrollo (ADB); propuesta de
RPCC (coordinador regional técnico).
¿Hay traspaso de beneficios / compensaciones entre miembros?
Operativas vía precios/peajes bilaterales; no hay reparto multilateral de CAPEX.
•
ISCI
29
==End of OCR for page 28==
==Start of OCR for page 29==
ISCI
Asia – Comercio Eléctrico Subregional: BBIN
¿Quién lo paga?
•
CAPEX/OPEX: promotores (a menudo con financiación india); usuarios nacionales;
compradores PPA.
¿Cómo se paga?
•
PPA bilaterales de largo plazo (exportación hidro de Bután/Nepal a India); peajes nacionales.
¿Quién toma los riesgos?
•
•
•
Construcción/financia: promotor/Estado anfitrión (apoyo India).
Demanda/volumen: mayormente en el comprador (India) vía take-or-pay.
Regulatorio/transito: sin marco multilateral; coordinación caso a caso.
¿Cómo participaron los Estados?
•
Bilateral dominante; recomendaciones de ONU/BM para crear marco subregional y comité
directivo.
¿Hay traspaso de beneficios / compensaciones entre miembros?
•
Vía PPA y wheeling; no hay esquema regional de reparto de CAPEX.
30
==End of OCR for page 29==
==Start of OCR for page 30==
ISCI
Asia – Caso de Aplicación: Acuerdos de Compra de Energía
(PPA) en Proyectos de Exportación (Laos-Tailandia) (1/2)
¿Quién lo paga?
•
CAPEX de red (cada tramo nacional): TSO de cada país (p.ej., EDL en Laos / EGAT en
Tailandia) ⇒ usuarios nacionales vía tarifas.
•
•
OPEX de la interconexión: TSO de cada país -> usuarios nacionales vía tarifas del TSO.
Conexión del generador (IPP): paga cargo de conexión/obras dedicadas según norma
local.
¿Cómo se paga?
•
•
PPA a 25–30 años con take-or-pay (pagos por disponibilidad + energía), indexado.
Cargos de conexión y wheeling en cada país según metodología nacional.
•
Project finance (deuda/equity) del IPP servido con el flujo del PPA.
31
==End of OCR for page 30==
==Start of OCR for page 31==
Asia – Caso de Aplicación: Acuerdos de Compra de Energía
(PPA) en Proyectos de Exportación (Laos-Tailandia) (2/2)
¿Quién toma los riesgos?
•
•
•
•
•
Construcción / plazo / costos: TSO de cada país (por su tramo).
Disponibilidad / operación: TSO (KPIs; posibles penalidades).
Demanda / volumen / precio: bajo para el TSO (ingreso regulado, no merchant).
Coordinación binacional / tránsito: TSO-TSO (protecciones, despacho, control).
Regulatorio / permisos / FX: nacional; exposición del TSO según reglas locales.
¿Cómo participaron los Estados?
•
•
•
Nivel: Bilateral intergubernamental (MoU Laos-Tailandia que habilita el intercambio).
Regulación nacional: cada país aprueba tarifas/peajes y permisos de su tramo (sin
regulador supranacional).
Laos: concesión/licencia al IPP; Tailandia (EGAT): comprador único y habilitaciones de
importación.
¿Hay traspaso de beneficios / compensaciones entre miembros?
•
ISCI
Sí, vía operación: pagos del PPA fluyen de Tailandia Laos (ingresos del IPP +
royalties/impuestos en Laos).
32
==End of OCR for page 31==
==Start of OCR for page 32==
Comparación(1/2)
Caso
1) ¿Quién paga? | 2) ¿Cómo se paga?
UE
CAPEX/OPEX:
(PCI/CBCA)
TSOs/promotor
+ posible aporte
CBCA/CEF.
CAPEX/OPEX:
TSOs/promotor;
NSEC -
híbridos
offshore
SINEA
(MAERCP)
SIEPAC/MER
reparto entre
países según
beneficios
acordados.
CAPEX/OPEX
(fijo): TSO por
tramo de cada
país; pago por
uso exportador/
importador.
CAPEX: EPR
(BMD+socios);
OPEX: usuarios.
ISCI
3) ¿Quién toma los riesgos? | 4) ¿Cómo
construcción/operación;
CBCA traslada parte de CAPEX TSO:
a países beneficiarios.
Tarifa regulada TSO
(depreciación + O&M + WACC).
Reparto capex por beneficios
(CBCA) + tarifa regulada +
acuerdos voluntarios NSEC;
posible cofinanciamiento CEF.
Peajes nacionales; exportador
cobra Peaje Unitario.
Se fija un ingreso autorizado
regional (IARM) = CVT (precio
nodal) + CC (cubre IARM
socializando costos fijos).
bajo riesgo de volumen
(ingreso regulado).
TSOs/promotores:
tramos/hubs; coordinación
multinacional; no merchant
(traspaso a clientes por
tarifa reguladas).
TSO:
construcción/operación;
riesgo volumen bajo
(mercado de excedentes).
Construcción EPR;
Operación EOR/EPR;
ingresos estables vía CC.
participaron los
Estados?
Supranacional
(TEN-E/ACER) + ARN
nacionales.
Cooperación regional
por cuenca (NSEC) +
marcos nacionales.
Coordinador
Regional rotativo (2
años).
Supranacional: CRIE
(regulador) y EOR
(operación).
5) ¿Transferencias
de beneficios?
СВСА (САРЕХ) у
rentas de
congestión entre
TSOS.
Reparto CAPEX
por beneficios;
rentas de
congestión
compartidas
entre países.
Operativas
(peajes del
exportador/
precio importador
más barato que
costo local).
Operativas vía
CVT; costos fijos
socializados (CC).
33
==End of OCR for page 32==
==Start of OCR for page 33==
Comparación(2/2)
Caso
1) ¿Quién paga?
2) ¿Cómo se paga?
Colombia–
Panamá
(bilateral)
por sus tramos.
CAPEX/OPEX:
(CO) y ETESA (PA)
ISA
Tarifas
nacionales;
3) ¿Quién toma los riesgos? | 4) ¿Cómo participaron los Estados?
TSO(s):
construcción/disponibi
lidad; ingreso regulado.
Bilateral CREG–ASEP; Comité
Binacional de Reguladores
para resolución de disputas.
5) ¿Transferencias de
beneficios?
Operativas (peajes); no
reparto de CAPEX.
peajes por uso;
wheeling si hay
tránsito.
GMS (Gran
CAPEX:
Mekong)
TSOs/promotores
Peajes
nacionales;
TSO(s) por su tramo; Intergubernamental
con
riesgo
apoyo ADB; propuesta RPCC
(BMD);
OPEX:
wheeling;
PPA regulatorio/tránsito
(coordinador regional técnico)
usuarios
cubre energía
mayor.
nacionales.
BBIN
CAPEX: promotores
Peajes
con apoyo India;
OPEX: usuarios.
nacionales;
wheeling; PPAs caso, comprador (india)
Operativas vía peajes; no
CAPEX multilateral.
TSO(s) por su tramo;
coordinación caso a
Intergubernamental
incipiente;
bilaterales.
bilaterales.
take or pay.
Laos-
CAPEX/OPEX: TSOS
Tailandia
(PPA,
interconexi
paga
dedicada.
por tramos; IPP
conexión
Tarifas
peajes
TSO; TSO:
construcción
Bilateral
(MoU)
/disponibilidad; ingreso
nacionales;
PPA regulado
(no
aprobaciones
nacionales;
regulatorias
coordinación
Operativas (PPA/peajes);
acuerdos sin reparto CAPEX
+
regional.
Pago PPA TH→LA (planta);
no transferencias de
CAPEX de la red.
paga energía
merchant).
TSO-TSO.
ón)
Itaipú
HVDC
Brasil (Furnas)
CAPEX/OPEX: TSO Tarifa regulada en TSO Brasil por su
Brasil (peajes)
tramo;
riesgo
regulatorio nacional.
Binacional en la planta; el
HVDC se decide/remunera
nacionalmente (Brasil).
Transferencias
por
4
‘energía cedida' (planta);
no por el link HVDC.
==End of OCR for page 33==
==Start of OCR for page 34==
!
ISCI
Revisión de literatura
35
==End of OCR for page 34==
==Start of OCR for page 35==
ISCI
¿Cómo analizaremos la información?
Enfoque del análisis: en cada caso mostraremos lo que recomienda la
academia para impulsar y sustentar las inversiones en interconexiones, dando
respuesta a las siguientes preguntas:
• ¿Quién lo paga? -> identificar los tipos de financistas.
•
¿Cómo se paga? -> identificar las metodologías existentes.
•
•
•
¿Quién toma los riesgos? -> Identifica quien mejor los gestiona.
¿Cómo participaron los Estados? Identifica una planificación y
coordinación regional.
¿Hay traspaso de beneficios/compensaciones entre miembros?
identificar compensaciones eficientes y transparentes para mantener
bienestar regional.
36
==End of OCR for page 35==
==Start of OCR for page 36==
Taxonomía de la literatura
Dimensión
Subtemas
Literatura
Arreglos supranacionales vs. multilayer;
coordinación regional; ausencia de
Marcos institucionales y gobernanza organismos comunes en LAC,
Financiamiento e inversión
Recuperación de costos / señales de
pago
Reparto de beneficios y
compensaciones
Gestión de riesgos
armonización regulatoria; planificación
coordinada TSOs/ministerios
Regulado (RAB/TSO), merchant, PPPs;
blended finance/IFIs
Peajes (postage-stamp/entry-exit),
rentas de congestión (ARRs/FTRs),
tarifas bipartitas, PPAs/CfDs
Beneficiary-pays; CBCA; teoría de
juegos (Shapley, Nucleolus); side
payments; ajustes ex-post
Riesgo precio/volumen; riesgo político-
regulatorio; garantías/seguros;
mecanismos bajo incertidumbre
Zimmermann (2019), Oseni & Pollitt
(2014); Kimura & Phoumin (2013);
Zachmann (2013).
Kristiansen, Muñoz et al. (2018); Knops
& de Jong (2005); Iliceto (2012); Dedecca
(2021).
Green et al. (2016); Andročec (2012);
Zhang et al. (2024); Kristiansen, Muñoz
et al. (2018);
Kristiansen, Muñoz et al. (2018);
Hagspiel (2017); “Enhancing the
Stability..." (2022); Nylund & Egerer
(2013). Kristiansen, Muñoz et al. (2018);
Usher & McLellan (2024); Beesten et al.
(2022); Huang & Van Hertem (2018).
ISCI
37
==End of OCR for page 36==
==Start of OCR for page 37==
Análisis - ¿Quién lo paga?
¿Quién lo paga?
Usuarios vía tarifa (beneficiary-pays
regional)
Transmisor/TSO regulado (tarifa local +
socialización regional)
Estado (presupuesto público/subsidio)
Inversionista privado “merchant"
Grandes consumidores (PPAs, peajes
dedicados)
Generadores (peajes de acceso,
contribuciones)
IFIs/Fondos multilaterales
(préstamos/blended finance)
Fondos regionales de compensación
APP/PPP (mixto público-privado)
ISCI
Fortalezas
Alinea pagos con beneficios; señal
eficiente de uso; estabilidad de ingresos
para la red.
Capacidad de ejecución; costos
reconocidos en tarifa; menor costo de
capital.
Viabiliza proyectos con fallas de mercado
o alto valor social; reduce WACC.
No carga tarifas; fuerte disciplina de
mercado; innovación contractual.
Señal directa de demanda; ancla
financiamiento; reduce riesgo de precio
para el offtaker.
Internaliza parte del beneficio (acceso a
mercados); reduce free-riding.
Debilidades
Requiere medición/atribución de
beneficios transfronterizos; complejidad
regulatoria.
Riesgo de sobre-socialización y señales
débiles si no se reflejan beneficios;
disputas entre países.
Riesgo fiscal y político; puede distorsionar
si no hay criterios claros.
Ingreso incierto (depende de
congestión/precios); sub-inversión en
bienes públicos; riesgo alto.
Beneficios de red no capturados por
completo; riesgo de concentración.
Pueden retraer inversión si los cargos no
reflejan beneficios; diseño sensible a
localización.
Baja costo financiero; disciplina
Procesos lentos; condicionalidades; no
técnica/social; apalanca capital privado. sustituye sostenibilidad tarifaria.
Facilita acuerdos políticos; compensa
asimetrías.
Comparte riesgos; eficiencia en
construcción/operación; innovación
contractual.
Puede diluir señales si es puro subsidio;
requiere gobernanza robusta.
Complejidad de contratos; riesgo de
renegociación.
¿Cómo funciona mejor?
Con metodologías de reparto por beneficio
marginal (Shapley/Nucleolus) y reglas
armonizadas entre países.
Con planificación regional coordinada y un
componente por beneficio en el peaje
transfronterizo.
Para externalidades (seguridad, resiliencia,
descarbonización) y gap de bancabilidad, con
sunset clauses y evaluación CBA/MCDA.
En corredores con congestión persistente y
productos de cobertura (FTRs) bien
diseñados.
Con PPAs (físicos/virtuales) complementados
por peajes de acceso y asignación de
capacidad transparente.
Con cargos nodales por acceso y
mecanismos de recuperación de congestión
equilibrados.
Como catalizador en fases iniciales y para
riesgos país, combinado con esquema tariff-
/benefit-based.
Como capa de ajuste ex-ante/ex-post basada
en beneficios netos y reglas transparentes.
Con matriz de riesgos clara, pagos por
disponibilidad, y benchmarking regional.
Fuentes: Kristiansen et al., 2018; Beesten et al., 2022; Nylund & Egerer, 2013; Zachmann, 2013; Oseni & Pollitt, 2014; Mezősi et al., 2023; Naval &
Yusta, 2024.; Sasaki & Nakayama, 2016; Buchmann et al., 2021; Kimura & Phoumin, 2013; Borge-Diez et al., 2024; Maung et al., 2024. Iliceto, 2012;
Knops & de Jong, 2005; Green et al., 2016; Andročec & Krajcar, 2013; Huang & Van Hertem, 2018. Iliceto, 2012; Dedecca, 2021.
38
==End of OCR for page 37==
==Start of OCR for page 38==
Análisis - ¿Cómo se paga?
¿Cómo se paga?
Fortalezas
Peajes de transmisión por uso (postage- Simple y estable; fácil de
stamp / entry-exit)
administrar.
Componente por beneficios (beneficiary- Alinea costos con beneficios;
pays)
Ingresos de congestión (market splitting,
ARRs/FTRs)
Cargos de acceso y conexión
(shallow/deep)
Pagos por disponibilidad/capacidad del
enlace (availability payments / RAB)
Servicios complementarios
transfronterizos (reserva, inercia, black-
start)
eficiente.
Señal locacional; puede
cofinanciar OPEX.
Internaliza costos inducidos por
nuevos usuarios.
Aumenta bancabilidad; traslada
riesgo de indisponibilidad al
operador.
Monetiza valor sistémico
adicional.
PPAs/CfDs transfronterizos (financieros o Estabilizan ingresos y reducen
físicos)
Debilidades
Poca señal locacional si es
uniforme.
Requiere medir/atribuir beneficios
regionales.
¿Cómo funciona mejor?
Con tarifa de dos partes (fijo +
variable), componente locacional
y revisión periódica.
Con metodologías
Shapley/Nucleolus y
gobernança regional.
Volátil y usualmente insuficiente Como complemento, no
para cubrir CAPEX.
sustituto del peaje base.
“Deep” puede frenar inversión.
Riesgo de sobrepago si KPIs
débiles.
Mercados incipientes;
coordinación operativa.
No capturan todo el valor de red.
WACC.
Blended finance / subsidios focalizados
(IFIs, bonos verdes)
Cierra brechas de bancabilidad y
riesgo país.
Distorsión si es permanente.
Fondo regional de compensación/ajuste
ISCI
Viabiliza políticamente; corrige
asimetrías.
Burocracia; riesgo de captura.
Shallow + peaje de uso + reglas
transparentes.
Con KPIs, penalidades y
auditoría independiente.
Con estándares comunes y
clearing coordinado.
Como ancla de demanda base +
peajes/reglas de acceso.
Temporal, ligado a
externalidades y metas
públicas.
Con reglas ex-ante basadas en
bienestar neto.
39
==End of OCR for page 38==
==Start of OCR for page 39==
Análisis - ¿Quién toma los riegos?
¿Quién toma los riesgos?
Inversionista/operador privado
(SPV/concesionario)
Contratista EPC
TSO regulado
Usuarios (vía tarifa)
Estado (gobierno)
IFIs/aseguradoras
Generadores/traders (PPAs/CfDs)
Fortalezas
Eficiencia en construcción y O&M;
disciplina de costos.
Debilidades
WACC más alto; poca tolerancia a
riesgos exógenos (demanda, política).
Control de plazos/costos y calidad de Riesgo de sobrecostos si contratos
obra.
débiles.
Experiencia operativa sistémica;
coordinación regional.
Riesgo diversificado; estabilidad de
ingresos de red.
Capacidad para cubrir riesgo político-
regulatorio y coordinar países.
Coberturas y garantías que bajan
WACC; disciplina socioambiental.
Anclan ingresos; gestionan precio de
energía.
Grandes consumidores (offtakers)
Demanda firme; viabiliza
financiamiento.
Incentivos débiles si no hay KPIs.
Señales débiles si hay sobre-
socialización.
¿Cómo funciona mejor?
Toma: riesgo de construcción y disponibilidad. Mitiga:
EPC a precio fijo, seguros, pagos por disponibilidad
con penalidades por indisponibilidad.
Toma: riesgo de obra (costo/tiempo/calidad) vía
contratos turnkey, garantías de cumplimiento y daños
liquidados.
Toma: riesgo operativo sistémico. Mitiga: metas de
desempeño, incentivos/penalidades en el esquema
tarifario.
Toman residual: riesgo de demanda/uso. Mitiga:
peajes con componente por beneficios y señales
locacionales.
Toma/cubre: riesgo regulatorio/país (estabilidad
Riesgo fiscal; potencial de distorsión. normativa, tratados, garantías parciales). No debería
Procesos lentos; costos de
transacción.
Basis risk nodal; exposición a
congestión.
Riesgo de volumen propio.
Fondo regional de compensación
Reduce asimetrías y viabiliza acuerdos. Burocracia; riesgo de captura.
ISCI
tomar riesgo de performance.
Cubren: riesgo país/contraparte con garantías
parciales de crédito/políticas, seguros y blended
finance.
Toman/cubren: riesgo de precio vía CfDs/PPAs; Mitiga
congestión con FTRs.
Toman: parte del riesgo de demanda/precio con PPAS
(take-or-pay, indexación) y cláusulas de flexibilidad.
Toma/redistribuye: riesgo de beneficios
desbalanceados con reglas ex-ante/ex-post basadas
en bienestar neto.
40
==End of OCR for page 39==
==Start of OCR for page 40==
Análisis - ¿Cómo participaron los estados?
¿Cómo participaron los
Estados?
Armonización regulatoria y
gobernanza regional
Planificación regional
coordinada (TSOs/ministerios)
Cofinanciamiento/blended
finance público
Fortalezas
Debilidades
Reduce fricciones transfronterizas; Negociación lenta; riesgo de
previsibilidad.
acuerdos no vinculantes.
Prioriza por beneficio regional
neto; evita duplicidades.
Baja el WACC y viabiliza proyectos
con externalidades (resiliencia,
descarbonización).
Garantías y mitigación de riesgo-Aumenta bancabilidad; atrae
país/regulatorio
Permisos y licenciamiento
socioambiental
Fondo regional de
compensación/ajuste
Coordinación operativa y
acoplamiento de mercados
ISCI
capital privado.
Requiere datos compartidos y
metodologías comunes.
Riesgo de subsidios
permanentes/distorsiones.
Riesgo moral si cubre riesgos
controlables por privados.
Legitimidad social; certidumbre de Demoras si hay ventanillas
múltiples y criterios dispares.
plazos.
Viabiliza acuerdos con asimetrías
de beneficios.
Captura valor operativo (reserva,
confiabilidad, pérdidas).
Burocracia; riesgo de captura.
Requiere confianza y sistemas
compatibles.
¿Cómo funciona mejor?
Acuerdos vinculantes, cronograma
de implementación y entidad
regional con mandato claro.
CBA/MCDA transparentes, escenarios
y consulta pública; publicación
periódica del plan.
Temporal y focalizado, con sunset
clauses y criterios de elegibilidad
claros.
Garantías parciales, estabilidad
normativa, cláusulas de cambio de ley
y arbitraje internacional.
Ventanilla única, estándares E&S
armonizados y consulta temprana
con comunidades.
Reglas ex-ante basadas en beneficio
neto (p.ej., Shapley/Nucleolus) y
auditoría independiente.
Despacho/clearing coordinado,
reglas de congestión y productos de
cobertura (FTRs/CfDs) coherentes.
41
==End of OCR for page 40==
==Start of OCR for page 41==
Análisis - ¿Hay traspaso de beneficios/compensaciones?
¿Hay traspaso de
beneficios/compensaciones?
Reparto por beneficios netos
(Shapley / Nucleolus)
Transferencias ex-ante (“side
payments")
Ajustes ex-post por beneficios
realizados
Fondo regional de compensación
Revenue-sharing de rentas de
congestión (FTRs/ARRs)
Cargos de acceso/entry-exit con
componente por beneficio
Fortalezas
Debilidades
Alinea pagos con aportes
Exige modelación y datos;
marginales; estabilidad de coalición. puede ser difícil de explicar.
Viabiliza proyectos con asimetrías;
certeza para el cierre financiero.
Corrige diferencias entre esperado
vs. real; reduce controversias.
Simplifica flujos; facilita acuerdos
políticos.
Riesgo de “sobresubsidio” si
no hay revisión.
Volatilidad interanual;
necesita métricas
acordadas.
Burocracia; riesgo de
captura.
Monetiza valor locacional; cobertura Ingresos inciertos e
a participantes.
Señal económica estable y
predecible.
Pagos por disponibilidad/fiabilidad Mejora bancabilidad; incentivos
del enlace
PPAs/CfDs transfronterizos como
ancla + ajuste por red
ISCI
operativos claros.
insuficientes para CAPEX.
Reparto sensible a
supuestos de red.
¿Cómo funciona mejor?
Regla ex-ante aprobada
regionalmente, con reconciliación
anual y auditoría independiente.
Monto limitado por cap de bienestar
y cláusulas sunset; revisión cada 2–
3 años.
Indicadores estandarizados
(bienestar neto, congestión evitada) y
bandas de ajuste para suavizar.
Gobernanza clara, criterios
objetivos y transparencia; uso solo
para asimetrías persistentes.
Solo como complemento; reglas de
asignación pro-beneficio y
mercados acoplados.
Diseño armonizado y basado en
PTDF/LRIC; publicar metodología y
datos.
Riesgo de sobrepago si KPIs KPIs verificables, penalidades por
pobres.
Reduce WACC; coordina demanda- No capta todo el beneficio
oferta.
de red.
indisponibilidad y auditoría técnica.
PPA/CfD más peaje y ajuste por
beneficio; contratos estándar y
clearing coordinado.
42
==End of OCR for page 41==
==Start of OCR for page 42==
!
ISCI
Cuantificación de necesidades de interconexión
43
==End of OCR for page 42==
==Start of OCR for page 43==
ISCI
Escenarios
Eje
Tiempo
Generación
Transmisión
Hidrología
Demanda
Escenarios
Año 2025 (Base)
Año 2035
Año 2045
Con restricción de soberanía
(Sin inversiones en centrales a Carbón)
Sin restricción de soberanía
(Sin inversiones en centrales a Carbón)
Solo con las interconexiones existentes
(sin inversiones nuevas)
Con inversiones en capacidad de interconexión
Hidrología Alta, Media, Baja
Región Cono Sur
(Brasil-Sur y Paraguay)
Hidrología Alta, Media, Baja
Región Andina
(Colombia, Ecuador y Brasil-Norte)
Consumo para electrificación
Consumo sin electrificación
TOTAL
Cantidad de escenarios
(LATAM1)
Cantidad de escenarios
(LATAM2)
2
(2035 y 2045)
2
(2035 y 2045)
2
2
9
2
1
(Con inversiones en interconexión)
1
(Hidrología Media)
1
(Consumo con electrificación)
1
(Sin electrificación)
72
4 + año base
Se agregan escenarios medios en hidrología, sin electrificación de la demanda
44
==End of OCR for page 43==
==Start of OCR for page 44==
Capacidad (MW)
30000
25000
20000
15000
10000
5000
0
Capacidad (MW)
25000
20000
15000
10000
5000
0
Panama Colombia
Capacidad de las interconexiones
30000
Interconexiones proyectadas 2035
Capacidad optimizada 2035
Costa Rica Panama
Brazil - Paraguay
Brazil - Uruguay
Brazil - Argentina
Brazil - Bolivia
Venezuela Brazil
French Guiana - Brazil
Brazil - Guyana
Paraguay - Argentina
Paraguay - Bolivia
Uruguay - Argentina
Argentina - Chile
Argentina - Bolivia
Peru - Chile
Peru - Ecuador
Interconexiones
Peru - Bolivia
Chile - Bolivia
Ecuador - Colombia
Interconexiones proyectadas 2045
Colombia - Venezuela
Mexico - Guatemala
Honduras - Nicaragua
Guatemala Honduras
El Salvador Honduras
Nicaragua - Costa Rica
Guatemala - El Salvador
Suriname - French Guiana
Guyana - Suriname
Capacidad optimizada 2045
Corredores que destacan (señal
del modelo):
•Centroamérica: refuerzo SIEPAС —
Costa Rica–Panamá, Nicaragua–
Costa Rica, Honduras–Nicaragua— y
Panamá-Colombia; seguimiento:
México-Guatemala.
•Atlántico del Cono Sur: Brasil-
Argentina (salto relevante
2035→2045)
•Eje andino del Pacífico (y Caribe
andino): Ecuador–Colombia, Perú-
Chile, Argentina–Chile; y, con mayor
capacidad, Colombia–Venezuela y
Venezuela-Brasil (prioritarios y
Panama Colombia
Costa Rica Panama
Brazil - Paraguay
Brazil - Uruguay
Brazil - Argentina
Brazil - Bolivia
Venezuela Brazil
French Guiana - Brazil
Brazil - Guyana
Paraguay - Argentina
Paraguay - Bolivia
Uruguay - Argentina
Argentina - Chile
Argentina Bolivia
Peru - Chile
Peru - Ecuador
Interconexiones
Peru - Bolivia
Chile - Bolivia
Ecuador - Colombia
Colombia - Venezuela
Mexico Guatemala
Honduras - Nicaragua
Guatemala Honduras
El Salvador Honduras
Nicaragua Costa Rica
Guatemala El Salvador
Suriname - French Guiana
Guyana Suriname
robustos).
ISCI
45
==End of OCR for page 44==
==Start of OCR for page 45==
!
ISCI
Conclusiones Preliminares
46
==End of OCR for page 45==
==Start of OCR for page 46==
Conclusiones
Pregunta
¿Quién lo paga?
Aplicaciones Prácticas
Generalmente lo pagan los transmisores/operadores
de red (TSOs) o empresas privadas con aval estatal.
En proyectos binacionales se suele negociar caso a
caso, con acuerdos bilaterales o multilaterales.
Enfoques académicos
Que lo paguen quienes se benefician: esquema
"beneficiario-paga”, basado en el aporte marginal de
cada país/actor al bienestar regional. Recomiendan
mecanismos de reparto equitativos como Shapley o
nucleolus.
¿Cómo se paga?
Mediante peajes de transmisión, tasas de utilización,
tarifas reguladas o, en casos merchant, con ingresos
por congestión o contratos bilaterales de compraventa
de energía eléctrica a largo plazo (PPA).
Con estructuras armonizadas de cobro a nivel regional,
combinando cargos por uso y por beneficios. Integrar
también instrumentos de mercado como los derechos
financieros (FTRs), contratos financieros (CFDs) para
eficiencia y liquidez.
¿Quién toma los riesgos?
¿Cómo participaron los
estados?
¿Hay traspaso de
beneficios/compensaciones?
En proyectos merchant, el inversor privado; en
regulados, los usuarios (vía tarifas) y el Estado (riesgo
político/regulatorio). Los riesgos se negocian entre
partes, muchas veces de forma asimétrica.
Los Estados suelen liderar permisos, proveer
garantías, negociar tratados bilaterales y, en algunos
casos, cofinanciar. La coordinación regional es
limitada.
Sí, pero de forma ad-hoc: pagos compensatorios entre
países, acuerdos bilaterales o transferencias únicas
para viabilizar proyectos.
Diseñar mecanismos de reparto de riesgo entre actores
(inversores, usuarios, Estados) para evitar que recaiga
desproporcionadamente en algunos países. Incorporar
riesgo en la planificación y en los esquemas de
compensación.
Los Estados deberían liderar la armonización
regulatoria
y
la planificación coordinada,
fortaleciendo la gobernanza multinacional. Su rol es
crear marcos estables y reducir barreras institucionales.
Recomiendan mecanismos sistemáticos de
compensación y reparto de beneficios, con base en
teoría de juegos cooperativos (Shapley, nucleolus) y
en métricas de bienestar regional neto, incluyendo
CBCA para el CAPEX transfronterizo.
==End of OCR for page 46==
==Start of OCR for page 47==
ISCI
•
•
•
•
•
¿Cuán lejos se está en la práctica?
Europa (UE): Marco formal avanzado, pero el reparto real de CAPEX es acotado,
porque el TSO suele recuperar vía tarifa nacional + subsidios CEF/PCI; el CBCA caso a caso
tiene incertidumbre y alto costo político/administrativo para montos relativamente
pequeños.
SIEPAC: Funciona como tarifa de dos partes (CVT + CC-sin CBCA),
porque las rentas de congestión (CVT) son volátiles/insuficientes para cubrir CAPEX; el CC
asegura la bancarización (fijo) y el CVT mantiene señales de uso (variable).
Cono Andino / LAC (SINEA, Col-Pan): Bilateral y peajes nacionales; poco benefit-sharing,
porque no hay órgano supranacional con CBCA; cada país financia su tramo con su
regulación → simple y bancable, pero sin reparto regional del CAРЕХ.
Brasil-Paraguay (Itaipú, foco cable HVDC): El cable se remunera como activo nacional
(Brasil), porque el tratado regula la energía, no un CBCA del cable; el HVDC entra al
régimen tarifario brasileño (no hay traspaso de CAPEX a Paraguay).
Asia (GMS/BBIN/Laos–Tailandia): PPAs + wheeling; poca reasignación fija regional,
porque se prioriza la bancarización contractual (take-or-pay) y no existe un regulador
regional fuerte que obligue a compartir CAPEX.
48
==End of OCR for page 47==
==Start of OCR for page 48==
ISCI
Brecha detectada
!
Donde hay instituciones supranacionales
ejecutivas (UE/SIEPAC) se separa fijo vs.
variable, pero el traspaso de CAPEX sigue
siendo limitado; donde no las hay (LAC/Asia),
se opta por reglas nacionales + contratos
que viabilizan sin benefit-sharing.
49
==End of OCR for page 48==
==Start of OCR for page 49==
ISCI
Preguntas abiertas para reflexión con el
Advisory Board
50
==End of OCR for page 49==
==Start of OCR for page 50==
La Brecha entre Teoría y Práctica
• Complejidad vs. Viabilidad: Considerando la brecha entre teoría y práctica:
•
•
¿Es la barrera principal para adoptar modelos de reparto de beneficios en
LAC, la complejidad técnica, la desconfianza política, o que los modelos
teóricos ignoran riesgos financieros cruciales?
Evolución de los Mercados: Viendo que el reparto por beneficios solo surge
en mercados maduros:
•
¿Debería Latinoamérica aspirar a este como un camino evolutivo natural,
o consolidar su modelo actual basado en contratos como un paradigma
alternativo más adaptado a su realidad?
ISCI
51
==End of OCR for page 50==
==Start of OCR for page 51==
•
•
ISCI
El Desafío de la Gobernanza
Salto Institucional: Dado el fuerte arraigo de la soberanía nacional, ¿qué
catalizador sería necesario para crear un ente regional con autoridad real, y es
siquiera posible repartir costos de inversión de forma sistemática sin una
figura de ese tipo?
Gobernanza Intermedia: Sabemos que crear un regulador regional con poder
sobre los países es políticamente muy difícil. Nuestra presentación destaca
que, a falta de entes supranacionales, la cooperación en Latinoamérica se
apoya en modelos intermedios, como los acuerdos bilaterales (ej. Colombia-
Panamá) y la coordinación multilateral sin autoridad fuerte (ej. SINEA). ¿Son
estos marcos de gobernanza una base realista y suficiente sobre la cual
construir la integración regional, o representan una limitación estructural queе
inevitablemente frenará las inversiones más complejas que se requieren?"
52
==End of OCR for page 51==
==Start of OCR for page 52==
•
•
Viabilidad y Riesgos de la Propuesta para LAC
CBCA-Ligero: Respecto a nuestra propuesta de un "CBCA-ligero", ¿cuáles
identifican como sus principales riesgos y cuál es la condición habilitante
absolutamente crítica para asegurar su implementación efectiva?
Transición de Activos Existentes: Considerando que los activos de
interconexión existentes ya operan bajo reglas y contratos consolidados, ¿qué
tipo de circunstancia estratégica en el ciclo de vida de un activo —sea
financiera, operativa o contractual— ofrece la oportunidad más realista para
proponer su transición a un nuevo marco regional, y qué incentivo concreto
sería indispensable para asegurar la adhesión voluntaria de sus propietarios?
ISCI
53
==End of OCR for page 52==
==Start of OCR for page 53==
•
•
El Futuro y la Transición Energética
Valor Cambiante de la Interconexión: Con la transición a renovables, el valor
de la interconexión migra de energía a flexibilidad; ¿cómo deben adaptarse los
Análisis Costo-Beneficio y los mecanismos de pago para remunerar estos
nuevos servicios y justificar el reparto de costos?
Interacción de Instrumentos: Considerando la tensión entre los PPAs (que
dan certeza al proyecto) y los mercados (que optimizan el sistema), ¿qué
modelo híbrido ven factible para compatibilizar la bancabilidad de un activo
con la eficiencia de una red regional integrada?
ISCI
54
==End of OCR for page 53==
==Start of OCR for page 54==
ISCI
INSTITUTO
SISTEMAS COMPLEJOS
DE INGENIERÍA
Instituto Sistemas Complejos de Ingeniería
República 695, Santiago Centro, Chile.
+56 2 2689 4429 / +56 2 2689 4403
contacto@isci.cl/www.isci.cl
@centrolSCI
Institución Albergante
fcfm
POLININGAR
PWGAS PIHAISMATGAG
UNIVERSIDAD THE CHILE
Institución Asociada
Patrocina
PONTIFICIA
UNIVERSIDAD
CATÓLICA
DE CHILE
Agencia
Nacional de
Investigación
y Desarrolle
Gobierno de Chile
==End of OCR for page 54==
`;