'use strict'
module = null
try
  module = angular.module 'ndx'
catch e
  module = angular.module 'ndx', []
module.factory 'LocalSettings', (Auth, $rootElement) ->
  appName = $rootElement.attr 'ng-app'
  getUserSettings = ->
    output = {}
    if localStorage and user = Auth.getUser()
      try
        output = JSON.parse(localStorage.getItem("#{appName}_#{user._id}")) or {}
    output
  setUserSettings = (value) ->
    if localStorage and user = Auth.getUser()
      localStorage.setItem "#{appName}_#{user._id}", JSON.stringify(value)
    return
  getGlobalSettings = ->
    output = {}
    if localStorage
      try
        output = JSON.parse(localStorage.getItem(appName)) or {}
    output
  setGlobalSettings = (value) ->
    if localStorage
      localStorage.setItem appName, JSON.stringify(value)
    return
  get = (settings, key) ->
    bits = key.split /\./g
    output = settings
    for bit in bits
      output = output[bit] or {}
    if JSON.stringify(output) is '{}' then null else output
  set = (settings, key, value) ->
    bits = key.split /\./g
    output = settings
    for bit, i in bits
      if not output[bit]
        output[bit] = {}
      if i < bits.length - 1
        output = output[bit]
      else
        output[bit] = value
  get: (key) ->
    settings = getUserSettings()
    get settings, key
  set: (key, value) ->
    settings = getUserSettings()
    set settings, key, value
    setUserSettings settings
  getGlobal: (key) ->
    settings = getGlobalSettings()
    get settings, key
  setGlobal: (key, value) ->
    settings = getGlobalSettings()
    set settings, key, value
    setGlobalSettings settings