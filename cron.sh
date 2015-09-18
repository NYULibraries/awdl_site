#!/bin/bash

TODAY=`date +%Y%m%d`

PROJECT_DIR=/www/sites/awdl

BUILD_DIR=${PROJECT_DIR}/build

BACKUPS_DIR=${PROJECT_DIR}/backups

EPOCH=`stat -c '%Y' ${BUILD_DIR}`

mv ${BUILD_DIR} ${BACKUPS_DIR}/${EPOCH}

grunt --base ${PROJECT_DIR}

exit 0
