
CREATE KEYSPACE practica WITH replication = {'class': 'SimpleStrategy','replication_factor' : 1};

use practica;

create table ticket(correo text, fecha date, titulo text, descripcion text,primary key(correo,fecha));

copy ticket(titulo,fecha,correo,descripcion) from '/home/carga.csv';

insert into ticket_fecha(correo,fecha,titulo,descripcion) VALUES ('wilson@ejemplo.com','21-03-24','banco','descripcion');
insert into ticket_fecha(correo,fecha,titulo,descripcion) VALUES ('wilson@ejemplo1.com','21-03-24','banco','descripcion');
