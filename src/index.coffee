'use strict'
module = null
try
  module = angular.module 'ndx'
catch e
  module = angular.module 'ndx', []
module.factory 'LocalSettings', (Auth) ->
  getUserSettings = ->
    output = {}
    if localStorage and user = Auth.getUser()
      try
        output = JSON.parse(localStorage.getItem(user._id)) or {}
    output
  setUserSettings = (value) ->
    if localStorage and user = Auth.getUser()
      localStorage.setItem user._id, JSON.stringify(value)
    return
  get: (key) ->
    settings = getUserSettings()
    bits = key.split /\./g
    output = settings
    for bit in bits
      output = output[bit] or {}
    output
  set: (key, value) ->
    settings = getUserSettings()
    bits = key.split /\./g
    output = settings
    for bit, i in bits
      if not output[bit]
        output[bit] = {}
      if i < bits.length - 1
        output = output[bit]
      else
        output[bit] = value
    setUserSettings settings