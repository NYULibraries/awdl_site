#!/bin/bash

# crontab -e 
# 0 8 * * * /app/cron.sh

NOW=`date`

TODAY=`date +%Y%m%d`

PROJECT_DIR=/www/sites/awdl

BUILD_DIR=${PROJECT_DIR}/build

BACKUPS_DIR=${PROJECT_DIR}/backups

EPOCH=`stat -c '%Y' ${BUILD_DIR}`

echo ${NOW} > ${BUILD_DIR}/${TODAY}.out

mv ${BUILD_DIR} ${BACKUPS_DIR}/${EPOCH}

/usr/local/bin/grunt --no-color --gruntfile ${PROJECT_DIR}/Gruntfile.js --base ${PROJECT_DIR} >> ${PROJECT_DIR}/${TODAY}.out

mv ${PROJECT_DIR}/${TODAY}.out ${BUILD_DIR}/${TODAY}.out 

chmod 2775 -R ${BUILD_DIR}

chmod 550 ${BUILD_DIR}/${TODAY}.out

exit 0

