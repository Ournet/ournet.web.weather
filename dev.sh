#!/bin/bash

yarn remove @ournet/domain
yarn remove @ournet/api-client
yarn remove @ournet/weather-domain
yarn remove @ournet/places-domain

yarn link @ournet/domain
yarn link @ournet/api-client
yarn link @ournet/weather-domain
yarn link @ournet/places-domain

yarn test
