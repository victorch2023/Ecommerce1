# ✅ Checklist de Configuración de Firestore

Marca cada paso cuando lo completes:

## 📋 Pasos Manuales (Necesitas hacerlos tú)

### Paso 1: Crear Proyecto Firebase
- [ ] Ir a https://console.firebase.google.com/
- [ ] Hacer clic en "Agregar proyecto"
- [ ] Ingresar nombre del proyecto
- [ ] Completar el asistente
- [ ] Proyecto creado ✅

### Paso 2: Habilitar Firestore
- [ ] Ir a "Firestore Database" en el menú lateral
- [ ] Hacer clic en "Crear base de datos"
- [ ] Seleccionar "Comenzar en modo de prueba"
- [ ] Elegir ubicación (us-central recomendado)
- [ ] Hacer clic en "Habilitar"
- [ ] Firestore habilitado ✅

### Paso 3: Configurar Reglas de Seguridad
- [ ] Ir a Firestore Database → pestaña "Rules"
- [ ] Copiar las reglas de `MIGRACION_FIRESTORE.md` o `PASOS_RAPIDOS.md`
- [ ] Pegar en el editor de reglas
- [ ] Hacer clic en "Publicar"
- [ ] Reglas publicadas ✅

### Paso 4: Descargar Service Account Key
- [ ] Ir a Configuración del proyecto (ícono de engranaje)
- [ ] Ir a pestaña "Cuentas de servicio"
- [ ] Hacer clic en "Generar nueva clave privada"
- [ ] Descargar el archivo JSON
- [ ] Renombrar a: `serviceAccountKey.json`
- [ ] Mover a carpeta `backend/`
- [ ] Archivo en lugar correcto ✅

## 🚀 Pasos Automáticos (Ejecutar comandos)

### Paso 5: Verificar Configuración
```bash
cd backend
npm run verify
```
- [ ] Verificación exitosa ✅

### Paso 6: Migrar Datos (Opcional)
```bash
cd backend
npm run migrate
```
- [ ] Datos migrados ✅

### Paso 7: Probar Aplicación
```bash
cd backend
npm run dev
```
- [ ] Servidor iniciado correctamente ✅
- [ ] Ver mensaje: "✅ Firestore inicializado correctamente" ✅

## 📝 Notas

- **Tiempo estimado total**: ~10 minutos
- **Costo**: $0 (gratis permanentemente dentro de los límites)
- **Datos originales**: Tu SQLite (`ecommerce.db`) NO se elimina, es un backup

## 🆘 Si Tienes Problemas

1. **Error: "serviceAccountKey.json no encontrado"**
   → Verifica que el archivo esté en `backend/serviceAccountKey.json`

2. **Error: "Permission denied"**
   → Verifica que hayas publicado las reglas en Firebase Console

3. **Error: "Firestore no está inicializado"**
   → Ejecuta `npm run verify` para diagnosticar

## 📚 Documentación

- **Guía rápida**: [PASOS_RAPIDOS.md](PASOS_RAPIDOS.md)
- **Guía completa**: [MIGRACION_FIRESTORE.md](MIGRACION_FIRESTORE.md)
- **Índices**: [INDICES_FIRESTORE.md](INDICES_FIRESTORE.md)

