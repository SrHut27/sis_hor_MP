SELECT 
    a.id_agenda AS id_agenda_a,
    b.id_agenda AS id_agenda_b,
    a.id_semana,
    h1.nome_horario AS horario_a,
    h2.nome_horario AS horario_b,
    h1.horario_inicial AS horario_inicial_a,
    h1.horario_final AS horario_final_a,
    h2.horario_inicial AS horario_inicial_b,
    h2.horario_final AS horario_final_b
FROM 
    tb_agenda_escola a
JOIN 
    tb_horario h1 ON a.id_horario = h1.id_horario
JOIN 
    tb_agenda_escola b ON a.id_semana = b.id_semana AND a.id_agenda != b.id_agenda
JOIN 
    tb_horario h2 ON b.id_horario = h2.id_horario
WHERE 
    (
        (h1.horario_inicial < h2.horario_final AND h1.horario_final > h2.horario_inicial) OR 
        (h2.horario_inicial < h1.horario_final AND h2.horario_final > h1.horario_inicial)
    )
ORDER BY 
    a.id_semana, a.id_agenda, b.id_agenda;

