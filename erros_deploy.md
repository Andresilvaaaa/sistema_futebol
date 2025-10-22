Run appleboy/ssh-action@master
Run echo "$GITHUB_ACTION_PATH" >> $GITHUB_PATH
Run entrypoint.sh
Downloading drone-ssh-1.8.1-linux-amd64 from https://github.com/appleboy/drone-ssh/releases/download/v1.8.1
======= CLI Version Information =======
Drone SSH version 1.8.1
=======================================
🚀 Deploy iniciado em Wed Oct 22 15:06:57 UTC 2025
📦 Criando backup pré-deploy...
From https://github.com/Andresilvaaaa/sistema_futebol
   c48bc53..b85b190  main                -> origin/main
   2f263d0..08382d4  deploy-improvements -> origin/deploy-improvements
HEAD is now at b85b190 Merge branch 'deploy-improvements' into main
📥 Baixando novas imagens...
 frontend Pulling 
 postgres Pulling 
 backend Pulling 
 postgres Pulled 
 2d35ebdb57d9 Already exists 
 60e45a9660cf Already exists 
 e74e4ed823e9 Already exists 
 da04d522c98f Already exists 
 388602fb4b3e Pulling fs layer 
 d63c788d64b7 Pulling fs layer 
 401b11595c52 Pulling fs layer 
 d130c3fa3ccc Pulling fs layer 
 4aec5a4fac9f Pulling fs layer 
 049742feb241 Pulling fs layer 
 38513bd72563 Already exists 
 d130c3fa3ccc Waiting 
 4aec5a4fac9f Waiting 
 049742feb241 Waiting 
 a9ffe18d7fdb Already exists 
 e73850a50582 Already exists 
 19fb8589da02 Already exists 
 df72d4ac4339 Pulling fs layer 
 948ecd43a4a0 Pulling fs layer 
 e5caf8731a75 Pulling fs layer 
 87e0a2d3c153 Pulling fs layer 
 24f1f24f8e6b Pulling fs layer 
 df72d4ac4339 Waiting 
 948ecd43a4a0 Waiting 
 e5caf8731a75 Waiting 
 87e0a2d3c153 Waiting 
 24f1f24f8e6b Waiting 
 21cd48f978f5 Pulling fs layer 
 be6d2862a83a Pulling fs layer 
 e4eddf6308cc Pulling fs layer 
 205c3766881b Pulling fs layer 
 297ac77fe774 Pulling fs layer 
 21cd48f978f5 Waiting 
 be6d2862a83a Waiting 
 e4eddf6308cc Waiting 
 205c3766881b Waiting 
 297ac77fe774 Waiting 
 401b11595c52 Downloading [=>                                                 ]  1.378kB/61.27kB
 401b11595c52 Downloading [==================================================>]  61.27kB/61.27kB
 401b11595c52 Verifying Checksum 
 401b11595c52 Download complete 
 388602fb4b3e Downloading [==================================================>]      93B/93B
 388602fb4b3e Verifying Checksum 
 388602fb4b3e Download complete 
 388602fb4b3e Extracting [==================================================>]      93B/93B
 388602fb4b3e Extracting [==================================================>]      93B/93B
 388602fb4b3e Pull complete 
 4aec5a4fac9f Downloading [>                                                  ]  1.378kB/118.8kB
 4aec5a4fac9f Downloading [==================================================>]  118.8kB/118.8kB
 4aec5a4fac9f Verifying Checksum 
 4aec5a4fac9f Download complete 
 d63c788d64b7 Downloading [>                                                  ]  43.94kB/4.327MB
 d130c3fa3ccc Downloading [>                                                  ]  540.7kB/200.9MB
 049742feb241 Downloading [>                                                  ]  539.5kB/84.94MB
 d130c3fa3ccc Downloading [=>                                                 ]   4.85MB/200.9MB
 d63c788d64b7 Downloading [================================================>  ]  4.227MB/4.327MB
 d63c788d64b7 Verifying Checksum 
 d63c788d64b7 Download complete 
 d63c788d64b7 Extracting [>                                                  ]  65.54kB/4.327MB
 049742feb241 Downloading [=>                                                 ]  3.243MB/84.94MB
 d130c3fa3ccc Downloading [==>                                                ]  8.087MB/200.9MB
 d63c788d64b7 Extracting [==>                                                ]  196.6kB/4.327MB
 d130c3fa3ccc Downloading [==>                                                ]  9.699MB/200.9MB
 d130c3fa3ccc Downloading [==>                                                ]  11.32MB/200.9MB
 049742feb241 Downloading [====>                                              ]  7.553MB/84.94MB
 d63c788d64b7 Extracting [===>                                               ]  262.1kB/4.327MB
 d130c3fa3ccc Downloading [====>                                              ]  19.37MB/200.9MB
 049742feb241 Downloading [=====>                                             ]  9.716MB/84.94MB
 d130c3fa3ccc Downloading [======>                                            ]  27.41MB/200.9MB
 df72d4ac4339 Downloading [==================================================>]      93B/93B
 df72d4ac4339 Verifying Checksum 
 df72d4ac4339 Download complete 
 df72d4ac4339 Extracting [==================================================>]      93B/93B
 df72d4ac4339 Extracting [==================================================>]      93B/93B
 df72d4ac4339 Pull complete 
 d130c3fa3ccc Downloading [=======>                                           ]  29.55MB/200.9MB
 049742feb241 Downloading [========>                                          ]     14MB/84.94MB
 d63c788d64b7 Extracting [===>                                               ]  327.7kB/4.327MB
 d63c788d64b7 Extracting [====>                                              ]  393.2kB/4.327MB
 d130c3fa3ccc Downloading [========>                                          ]   34.9MB/200.9MB
 049742feb241 Downloading [===========>                                       ]  18.84MB/84.94MB
 d130c3fa3ccc Downloading [==========>                                        ]  40.79MB/200.9MB
 049742feb241 Downloading [==============>                                    ]  25.24MB/84.94MB
 049742feb241 Downloading [==================>                                ]  32.24MB/84.94MB
 049742feb241 Downloading [===================>                               ]  32.78MB/84.94MB
 d130c3fa3ccc Downloading [===========>                                       ]  45.08MB/200.9MB
 d63c788d64b7 Extracting [=======>                                           ]  655.4kB/4.327MB
 049742feb241 Downloading [===================>                               ]  33.31MB/84.94MB
 948ecd43a4a0 Downloading [>                                                  ]  539.5kB/198.8MB
 d130c3fa3ccc Downloading [===========>                                       ]  45.61MB/200.9MB
 049742feb241 Downloading [===================>                               ]  33.85MB/84.94MB
 d63c788d64b7 Extracting [========>                                          ]  720.9kB/4.327MB
 948ecd43a4a0 Downloading [>                                                  ]   1.08MB/198.8MB
 d130c3fa3ccc Downloading [===========>                                       ]  46.14MB/200.9MB
 d63c788d64b7 Extracting [=========>                                         ]  786.4kB/4.327MB
 049742feb241 Downloading [====================>                              ]  34.39MB/84.94MB
 d130c3fa3ccc Downloading [===========>                                       ]  46.68MB/200.9MB
 948ecd43a4a0 Downloading [>                                                  ]  2.161MB/198.8MB
 049742feb241 Downloading [====================>                              ]  34.92MB/84.94MB
 d63c788d64b7 Extracting [=========>                                         ]    852kB/4.327MB
 d130c3fa3ccc Downloading [===========>                                       ]  47.22MB/200.9MB
 948ecd43a4a0 Downloading [>                                                  ]  2.702MB/198.8MB
 049742feb241 Downloading [====================>                              ]  35.46MB/84.94MB
 d130c3fa3ccc Downloading [===========>                                       ]  47.75MB/200.9MB
 d63c788d64b7 Extracting [==========>                                        ]  917.5kB/4.327MB
 d130c3fa3ccc Downloading [============>                                      ]  48.29MB/200.9MB
 948ecd43a4a0 Downloading [>                                                  ]  3.783MB/198.8MB
 049742feb241 Downloading [=====================>                             ]  36.01MB/84.94MB
 d130c3fa3ccc Downloading [============>                                      ]  48.83MB/200.9MB
 d63c788d64b7 Extracting [===========>                                       ]    983kB/4.327MB
 049742feb241 Downloading [=====================>                             ]  36.54MB/84.94MB
 d130c3fa3ccc Downloading [============>                                      ]  49.36MB/200.9MB
 049742feb241 Downloading [=====================>                             ]  37.07MB/84.94MB
 948ecd43a4a0 Downloading [=>                                                 ]  4.865MB/198.8MB
 049742feb241 Downloading [======================>                            ]  37.61MB/84.94MB
 d130c3fa3ccc Downloading [============>                                      ]  50.42MB/200.9MB
 948ecd43a4a0 Downloading [=>                                                 ]  5.406MB/198.8MB
 d63c788d64b7 Extracting [============>                                      ]  1.049MB/4.327MB
 d130c3fa3ccc Downloading [============>                                      ]  50.96MB/200.9MB
 948ecd43a4a0 Downloading [=>                                                 ]  5.941MB/198.8MB
 049742feb241 Downloading [======================>                            ]  38.14MB/84.94MB
 d130c3fa3ccc Downloading [============>                                      ]  51.49MB/200.9MB
 049742feb241 Downloading [======================>                            ]  38.68MB/84.94MB
 948ecd43a4a0 Downloading [=>                                                 ]  6.482MB/198.8MB
 948ecd43a4a0 Downloading [=>                                                 ]  7.562MB/198.8MB
 d130c3fa3ccc Downloading [=============>                                     ]  53.09MB/200.9MB
 d63c788d64b7 Extracting [============>                                      ]  1.114MB/4.327MB
 049742feb241 Downloading [=======================>                           ]  39.75MB/84.94MB
 d63c788d64b7 Extracting [=============>                                     ]   1.18MB/4.327MB
 948ecd43a4a0 Downloading [==>                                                ]  9.184MB/198.8MB
 d130c3fa3ccc Downloading [=============>                                     ]  55.76MB/200.9MB
 049742feb241 Downloading [========================>                          ]  41.35MB/84.94MB
 d130c3fa3ccc Downloading [==============>                                    ]  58.44MB/200.9MB
 948ecd43a4a0 Downloading [==>                                                ]   10.8MB/198.8MB
 d63c788d64b7 Extracting [===============>                                   ]  1.311MB/4.327MB
 049742feb241 Downloading [=========================>                         ]   43.5MB/84.94MB
 d130c3fa3ccc Downloading [==============>                                    ]  58.98MB/200.9MB
 d63c788d64b7 Extracting [===============>                                   ]  1.376MB/4.327MB
 948ecd43a4a0 Downloading [===>                                               ]  12.42MB/198.8MB
 d130c3fa3ccc Downloading [==============>                                    ]  59.52MB/200.9MB
 049742feb241 Downloading [=========================>                         ]  44.03MB/84.94MB
 948ecd43a4a0 Downloading [===>                                               ]  12.96MB/198.8MB
 d130c3fa3ccc Downloading [==============>                                    ]  60.06MB/200.9MB
 049742feb241 Downloading [==========================>                        ]  44.57MB/84.94MB
 948ecd43a4a0 Downloading [===>                                               ]   13.5MB/198.8MB
 d130c3fa3ccc Downloading [===============>                                   ]   60.6MB/200.9MB
 d63c788d64b7 Extracting [=================>                                 ]  1.507MB/4.327MB
 049742feb241 Downloading [==========================>                        ]   45.1MB/84.94MB
 948ecd43a4a0 Downloading [===>                                               ]  14.04MB/198.8MB
 d130c3fa3ccc Downloading [===============>                                   ]  61.13MB/200.9MB
 049742feb241 Downloading [==========================>                        ]  45.64MB/84.94MB
 d63c788d64b7 Extracting [==================>                                ]  1.573MB/4.327MB
 948ecd43a4a0 Downloading [===>                                               ]  14.58MB/198.8MB
 d130c3fa3ccc Downloading [===============>                                   ]  61.67MB/200.9MB
 049742feb241 Downloading [===========================>                       ]  46.18MB/84.94MB
 d130c3fa3ccc Downloading [===============>                                   ]   62.2MB/200.9MB
 948ecd43a4a0 Downloading [===>                                               ]  15.12MB/198.8MB
 d130c3fa3ccc Downloading [===============>                                   ]  62.74MB/200.9MB
 049742feb241 Downloading [===========================>                       ]  46.71MB/84.94MB
 948ecd43a4a0 Downloading [===>                                               ]  15.65MB/198.8MB
 948ecd43a4a0 Downloading [====>                                              ]  16.19MB/198.8MB
 d63c788d64b7 Extracting [==================>                                ]  1.638MB/4.327MB
 d130c3fa3ccc Downloading [===============>                                   ]  63.82MB/200.9MB
 049742feb241 Downloading [============================>                      ]  47.78MB/84.94MB
 948ecd43a4a0 Downloading [====>                                              ]  16.72MB/198.8MB
 d130c3fa3ccc Downloading [================>                                  ]  64.36MB/200.9MB
 d130c3fa3ccc Downloading [================>                                  ]   64.9MB/200.9MB
 948ecd43a4a0 Downloading [====>                                              ]  17.26MB/198.8MB
 049742feb241 Downloading [============================>                      ]  48.86MB/84.94MB
 948ecd43a4a0 Downloading [====>                                              ]   17.8MB/198.8MB
 d130c3fa3ccc Downloading [================>                                  ]  65.42MB/200.9MB
 d63c788d64b7 Extracting [===================>                               ]  1.704MB/4.327MB
 049742feb241 Downloading [=============================>                     ]   49.4MB/84.94MB
 948ecd43a4a0 Downloading [====>                                              ]  18.34MB/198.8MB
 d130c3fa3ccc Downloading [================>                                  ]  65.96MB/200.9MB
 049742feb241 Downloading [=============================>                     ]  49.94MB/84.94MB
 049742feb241 Downloading [=============================>                     ]  50.48MB/84.94MB
 d130c3fa3ccc Downloading [================>                                  ]   66.5MB/200.9MB
 948ecd43a4a0 Downloading [====>                                              ]  18.87MB/198.8MB
 d63c788d64b7 Extracting [====================>                              ]  1.769MB/4.327MB
 049742feb241 Downloading [==============================>                    ]  51.01MB/84.94MB
 d130c3fa3ccc Downloading [================>                                  ]   68.1MB/200.9MB
 948ecd43a4a0 Downloading [=====>                                             ]  20.49MB/198.8MB
 049742feb241 Downloading [===============================>                   ]  53.15MB/84.94MB
 d130c3fa3ccc Downloading [=================>                                 ]  69.17MB/200.9MB
 d63c788d64b7 Extracting [=====================>                             ]  1.835MB/4.327MB
 d130c3fa3ccc Downloading [=================>                                 ]  69.71MB/200.9MB
 948ecd43a4a0 Downloading [=====>                                             ]  21.03MB/198.8MB
 049742feb241 Downloading [===============================>                   ]   53.7MB/84.94MB
 d130c3fa3ccc Downloading [=================>                                 ]  70.25MB/200.9MB
 948ecd43a4a0 Downloading [=====>                                             ]  21.57MB/198.8MB
 d63c788d64b7 Extracting [=====================>                             ]  1.901MB/4.327MB
 049742feb241 Downloading [===============================>                   ]  54.23MB/84.94MB
 d130c3fa3ccc Downloading [=================>                                 ]  70.78MB/200.9MB
 948ecd43a4a0 Downloading [=====>                                             ]  22.11MB/198.8MB
 948ecd43a4a0 Downloading [=====>                                             ]  22.65MB/198.8MB
 049742feb241 Downloading [================================>                  ]  54.76MB/84.94MB
 d130c3fa3ccc Downloading [=================>                                 ]  71.85MB/200.9MB
 d63c788d64b7 Extracting [======================>                            ]  1.966MB/4.327MB
 049742feb241 Downloading [================================>                  ]   55.3MB/84.94MB
 948ecd43a4a0 Downloading [=====>                                             ]  23.19MB/198.8MB
 d130c3fa3ccc Downloading [==================>                                ]  72.38MB/200.9MB
 d63c788d64b7 Extracting [========================>                          ]  2.097MB/4.327MB
 049742feb241 Downloading [================================>                  ]  55.84MB/84.94MB
 948ecd43a4a0 Downloading [=====>                                             ]  23.73MB/198.8MB
 d130c3fa3ccc Downloading [==================>                                ]  72.92MB/200.9MB
 049742feb241 Downloading [=================================>                 ]  56.37MB/84.94MB
 d63c788d64b7 Extracting [=========================>                         ]  2.228MB/4.327MB
 d130c3fa3ccc Downloading [==================>                                ]  73.46MB/200.9MB
 948ecd43a4a0 Downloading [======>                                            ]  24.81MB/198.8MB
 d130c3fa3ccc Downloading [==================>                                ]  73.99MB/200.9MB
 d63c788d64b7 Extracting [===========================>                       ]  2.359MB/4.327MB
 049742feb241 Downloading [=================================>                 ]  57.44MB/84.94MB
 948ecd43a4a0 Downloading [======>                                            ]  25.35MB/198.8MB
 049742feb241 Downloading [==================================>                ]  57.98MB/84.94MB
 948ecd43a4a0 Downloading [======>                                            ]  25.88MB/198.8MB
 d63c788d64b7 Extracting [=============================>                     ]  2.556MB/4.327MB
 d130c3fa3ccc Downloading [==================>                                ]  75.06MB/200.9MB
 d63c788d64b7 Extracting [===============================>                   ]  2.687MB/4.327MB
 948ecd43a4a0 Downloading [=======>                                           ]  28.03MB/198.8MB
 049742feb241 Downloading [===================================>               ]  60.66MB/84.94MB
 d130c3fa3ccc Downloading [===================>                               ]  76.67MB/200.9MB
 948ecd43a4a0 Downloading [=======>                                           ]  28.57MB/198.8MB
 049742feb241 Downloading [====================================>              ]   61.2MB/84.94MB
 d63c788d64b7 Extracting [================================>                  ]  2.818MB/4.327MB
 d63c788d64b7 Extracting [==================================>                ]  2.949MB/4.327MB
 049742feb241 Downloading [====================================>              ]  62.26MB/84.94MB
 d130c3fa3ccc Downloading [===================>                               ]  77.75MB/200.9MB
 948ecd43a4a0 Downloading [=======>                                           ]  29.65MB/198.8MB
 049742feb241 Downloading [====================================>              ]   62.8MB/84.94MB
 d63c788d64b7 Extracting [====================================>              ]  3.146MB/4.327MB
 948ecd43a4a0 Downloading [=======>                                           ]  30.18MB/198.8MB
 d130c3fa3ccc Downloading [===================>                               ]  78.83MB/200.9MB
 049742feb241 Downloading [=====================================>             ]  63.34MB/84.94MB
 948ecd43a4a0 Downloading [=======>                                           ]  30.72MB/198.8MB
 d63c788d64b7 Extracting [=====================================>             ]  3.277MB/4.327MB
 049742feb241 Downloading [=====================================>             ]  63.88MB/84.94MB
 d130c3fa3ccc Downloading [===================>                               ]  79.35MB/200.9MB
 d63c788d64b7 Extracting [=======================================>           ]  3.408MB/4.327MB
 d130c3fa3ccc Downloading [===================>                               ]  79.89MB/200.9MB
 049742feb241 Downloading [=====================================>             ]  64.42MB/84.94MB
 948ecd43a4a0 Downloading [=======>                                           ]   31.8MB/198.8MB
 049742feb241 Downloading [======================================>            ]  64.96MB/84.94MB
 d63c788d64b7 Extracting [=========================================>         ]  3.604MB/4.327MB
 d130c3fa3ccc Downloading [====================>                              ]  80.43MB/200.9MB
 948ecd43a4a0 Downloading [========>                                          ]  32.33MB/198.8MB
 049742feb241 Downloading [======================================>            ]   65.5MB/84.94MB
 d63c788d64b7 Extracting [===========================================>       ]  3.801MB/4.327MB
 d130c3fa3ccc Downloading [====================>                              ]  80.96MB/200.9MB
 d130c3fa3ccc Downloading [====================>                              ]   81.5MB/200.9MB
 d63c788d64b7 Extracting [==============================================>    ]  4.063MB/4.327MB
 948ecd43a4a0 Downloading [========>                                          ]  33.39MB/198.8MB
 049742feb241 Downloading [=======================================>           ]  66.58MB/84.94MB
 d63c788d64b7 Extracting [=================================================> ]   4.26MB/4.327MB
 d130c3fa3ccc Downloading [====================>                              ]  82.04MB/200.9MB
 d63c788d64b7 Extracting [==================================================>]  4.327MB/4.327MB
 948ecd43a4a0 Downloading [========>                                          ]  33.93MB/198.8MB
 049742feb241 Downloading [=======================================>           ]  67.12MB/84.94MB
 d130c3fa3ccc Downloading [====================>                              ]  82.57MB/200.9MB
 049742feb241 Downloading [=======================================>           ]  67.65MB/84.94MB
 948ecd43a4a0 Downloading [========>                                          ]  35.02MB/198.8MB
 d130c3fa3ccc Downloading [====================>                              ]   83.1MB/200.9MB
 049742feb241 Downloading [========================================>          ]  68.19MB/84.94MB
 948ecd43a4a0 Downloading [========>                                          ]  35.56MB/198.8MB
 d63c788d64b7 Pull complete 
 049742feb241 Downloading [========================================>          ]  68.72MB/84.94MB
 d130c3fa3ccc Downloading [====================>                              ]  83.63MB/200.9MB
 401b11595c52 Extracting [==========================>                        ]  32.77kB/61.27kB
 401b11595c52 Extracting [==================================================>]  61.27kB/61.27kB
 948ecd43a4a0 Downloading [=========>                                         ]  36.09MB/198.8MB
 049742feb241 Downloading [========================================>          ]  69.26MB/84.94MB
 d130c3fa3ccc Downloading [====================>                              ]  84.17MB/200.9MB
 049742feb241 Downloading [=========================================>         ]   69.8MB/84.94MB
 948ecd43a4a0 Downloading [=========>                                         ]  36.63MB/198.8MB
 401b11595c52 Pull complete 
 d130c3fa3ccc Downloading [=====================>                             ]  84.71MB/200.9MB
 049742feb241 Downloading [=========================================>         ]  70.33MB/84.94MB
 948ecd43a4a0 Downloading [=========>                                         ]  37.71MB/198.8MB
 d130c3fa3ccc Downloading [=====================>                             ]  85.79MB/200.9MB
 049742feb241 Downloading [==========================================>        ]  71.95MB/84.94MB
 948ecd43a4a0 Downloading [=========>                                         ]  39.33MB/198.8MB
 d130c3fa3ccc Downloading [=====================>                             ]  86.85MB/200.9MB
 049742feb241 Downloading [==========================================>        ]  73.01MB/84.94MB
 948ecd43a4a0 Downloading [==========>                                        ]  40.41MB/198.8MB
 d130c3fa3ccc Downloading [=====================>                             ]  87.92MB/200.9MB
 049742feb241 Downloading [===========================================>       ]  74.07MB/84.94MB
 948ecd43a4a0 Downloading [==========>                                        ]  41.49MB/198.8MB
 d130c3fa3ccc Downloading [======================>                            ]     89MB/200.9MB
 948ecd43a4a0 Downloading [==========>                                        ]  42.03MB/198.8MB
 049742feb241 Downloading [===========================================>       ]   74.6MB/84.94MB
 d130c3fa3ccc Downloading [======================>                            ]  89.52MB/200.9MB
 948ecd43a4a0 Downloading [==========>                                        ]  42.56MB/198.8MB
 049742feb241 Downloading [============================================>      ]  75.14MB/84.94MB
 d130c3fa3ccc Downloading [======================>                            ]  90.06MB/200.9MB
 049742feb241 Downloading [============================================>      ]  75.68MB/84.94MB
 948ecd43a4a0 Downloading [==========>                                        ]   43.1MB/198.8MB
 d130c3fa3ccc Downloading [======================>                            ]   90.6MB/200.9MB
 948ecd43a4a0 Downloading [==========>                                        ]  43.64MB/198.8MB
 d130c3fa3ccc Downloading [======================>                            ]  91.14MB/200.9MB
 049742feb241 Downloading [=============================================>     ]  76.76MB/84.94MB
 948ecd43a4a0 Downloading [===========>                                       ]  44.18MB/198.8MB
 d130c3fa3ccc Downloading [======================>                            ]  91.67MB/200.9MB
 049742feb241 Downloading [=============================================>     ]  77.84MB/84.94MB
 948ecd43a4a0 Downloading [===========>                                       ]  44.72MB/198.8MB
 d130c3fa3ccc Downloading [======================>                            ]   92.2MB/200.9MB
 948ecd43a4a0 Downloading [===========>                                       ]  45.26MB/198.8MB
 049742feb241 Downloading [==============================================>    ]  78.92MB/84.94MB
 948ecd43a4a0 Downloading [===========>                                       ]   45.8MB/198.8MB
 d130c3fa3ccc Downloading [=======================>                           ]  93.28MB/200.9MB
 948ecd43a4a0 Downloading [===========>                                       ]  46.34MB/198.8MB
 d130c3fa3ccc Downloading [=======================>                           ]  94.36MB/200.9MB
 049742feb241 Downloading [===============================================>   ]  79.99MB/84.94MB
 049742feb241 Downloading [===============================================>   ]  80.52MB/84.94MB
 d130c3fa3ccc Downloading [=======================>                           ]  95.43MB/200.9MB
 948ecd43a4a0 Downloading [===========>                                       ]  47.42MB/198.8MB
 049742feb241 Downloading [================================================>  ]  81.59MB/84.94MB
 d130c3fa3ccc Downloading [=======================>                           ]  95.96MB/200.9MB
 948ecd43a4a0 Downloading [============>                                      ]   48.5MB/198.8MB
 049742feb241 Downloading [================================================>  ]  82.67MB/84.94MB
 d130c3fa3ccc Downloading [========================>                          ]  97.03MB/200.9MB
 049742feb241 Downloading [================================================>  ]   83.2MB/84.94MB
 d130c3fa3ccc Downloading [========================>                          ]  97.57MB/200.9MB
 948ecd43a4a0 Downloading [============>                                      ]  49.58MB/198.8MB
 049742feb241 Downloading [=================================================> ]  84.26MB/84.94MB
 948ecd43a4a0 Downloading [============>                                      ]  50.66MB/198.8MB
 d130c3fa3ccc Downloading [========================>                          ]  98.64MB/200.9MB
 049742feb241 Verifying Checksum 
 049742feb241 Download complete 
 d130c3fa3ccc Downloading [========================>                          ]  99.71MB/200.9MB
 948ecd43a4a0 Downloading [=============>                                     ]  51.74MB/198.8MB
 d130c3fa3ccc Downloading [=========================>                         ]  101.3MB/200.9MB
 948ecd43a4a0 Downloading [=============>                                     ]  53.36MB/198.8MB
 d130c3fa3ccc Downloading [=========================>                         ]  102.4MB/200.9MB
 948ecd43a4a0 Downloading [=============>                                     ]  54.44MB/198.8MB
 e5caf8731a75 Downloading [==================================================>]  1.001kB/1.001kB
 e5caf8731a75 Verifying Checksum 
 e5caf8731a75 Download complete 
 d130c3fa3ccc Downloading [==========================>                        ]  104.5MB/200.9MB
 948ecd43a4a0 Downloading [==============>                                    ]   56.6MB/198.8MB
 d130c3fa3ccc Downloading [==========================>                        ]  105.6MB/200.9MB
 948ecd43a4a0 Downloading [==============>                                    ]  57.67MB/198.8MB
 d130c3fa3ccc Downloading [==========================>                        ]  107.2MB/200.9MB
 948ecd43a4a0 Downloading [===============>                                   ]  59.84MB/198.8MB
 948ecd43a4a0 Downloading [===============>                                   ]  61.46MB/198.8MB
 d130c3fa3ccc Downloading [===========================>                       ]  108.8MB/200.9MB
 948ecd43a4a0 Downloading [===============>                                   ]  63.61MB/198.8MB
 87e0a2d3c153 Downloading [>                                                  ]  539.5kB/354MB
 d130c3fa3ccc Downloading [===========================>                       ]  110.4MB/200.9MB
 948ecd43a4a0 Downloading [================>                                  ]  64.69MB/198.8MB
 87e0a2d3c153 Downloading [>                                                  ]  1.621MB/354MB
 d130c3fa3ccc Downloading [===========================>                       ]  111.5MB/200.9MB
 948ecd43a4a0 Downloading [================>                                  ]  66.31MB/198.8MB
 d130c3fa3ccc Downloading [============================>                      ]  112.5MB/200.9MB
 87e0a2d3c153 Downloading [>                                                  ]  2.702MB/354MB
 948ecd43a4a0 Downloading [================>                                  ]  67.39MB/198.8MB
 87e0a2d3c153 Downloading [>                                                  ]  3.783MB/354MB
 d130c3fa3ccc Downloading [============================>                      ]  113.6MB/200.9MB
 948ecd43a4a0 Downloading [=================>                                 ]  68.46MB/198.8MB
 d130c3fa3ccc Downloading [============================>                      ]  115.2MB/200.9MB
 87e0a2d3c153 Downloading [>                                                  ]   5.39MB/354MB
 948ecd43a4a0 Downloading [=================>                                 ]  70.07MB/198.8MB
 d130c3fa3ccc Downloading [============================>                      ]  116.3MB/200.9MB
 87e0a2d3c153 Downloading [>                                                  ]  6.472MB/354MB
 948ecd43a4a0 Downloading [==================>                                ]  71.69MB/198.8MB
 87e0a2d3c153 Downloading [=>                                                 ]  7.553MB/354MB
 d130c3fa3ccc Downloading [=============================>                     ]  117.4MB/200.9MB
 948ecd43a4a0 Downloading [==================>                                ]  72.74MB/198.8MB
 87e0a2d3c153 Downloading [=>                                                 ]  8.634MB/354MB
 d130c3fa3ccc Downloading [=============================>                     ]  118.4MB/200.9MB
 948ecd43a4a0 Downloading [==================>                                ]  73.82MB/198.8MB
 87e0a2d3c153 Downloading [=>                                                 ]  9.716MB/354MB
 948ecd43a4a0 Downloading [==================>                                ]  74.87MB/198.8MB
 d130c3fa3ccc Downloading [=============================>                     ]  119.5MB/200.9MB
 87e0a2d3c153 Downloading [=>                                                 ]   10.8MB/354MB
 d130c3fa3ccc Downloading [==============================>                    ]  120.6MB/200.9MB
 948ecd43a4a0 Downloading [===================>                               ]  75.95MB/198.8MB
 87e0a2d3c153 Downloading [=>                                                 ]  11.88MB/354MB
 948ecd43a4a0 Downloading [===================>                               ]  77.03MB/198.8MB
 d130c3fa3ccc Downloading [==============================>                    ]  122.2MB/200.9MB
 87e0a2d3c153 Downloading [=>                                                 ]  14.02MB/354MB
 948ecd43a4a0 Downloading [===================>                               ]  79.18MB/198.8MB
 d130c3fa3ccc Downloading [==============================>                    ]  124.3MB/200.9MB
 87e0a2d3c153 Downloading [==>                                                ]  16.15MB/354MB
 948ecd43a4a0 Downloading [====================>                              ]  81.86MB/198.8MB
 d130c3fa3ccc Downloading [===============================>                   ]  126.5MB/200.9MB
 948ecd43a4a0 Downloading [=====================>                             ]  84.02MB/198.8MB
 87e0a2d3c153 Downloading [==>                                                ]   18.3MB/354MB
 d130c3fa3ccc Downloading [================================>                  ]  128.6MB/200.9MB
 948ecd43a4a0 Downloading [=====================>                             ]  86.17MB/198.8MB
 87e0a2d3c153 Downloading [==>                                                ]  20.43MB/354MB
 d130c3fa3ccc Downloading [================================>                  ]  131.3MB/200.9MB
 948ecd43a4a0 Downloading [======================>                            ]   89.4MB/198.8MB
 87e0a2d3c153 Downloading [===>                                               ]  24.19MB/354MB
 d130c3fa3ccc Downloading [=================================>                 ]  133.5MB/200.9MB
 948ecd43a4a0 Downloading [=======================>                           ]  91.56MB/198.8MB
 87e0a2d3c153 Downloading [====>                                              ]  32.23MB/354MB
 d130c3fa3ccc Downloading [=================================>                 ]  135.1MB/200.9MB
 948ecd43a4a0 Downloading [=======================>                           ]  94.25MB/198.8MB
 87e0a2d3c153 Downloading [=====>                                             ]  35.46MB/354MB
 d130c3fa3ccc Downloading [==================================>                ]  137.2MB/200.9MB
 948ecd43a4a0 Downloading [========================>                          ]   96.4MB/198.8MB
 87e0a2d3c153 Downloading [=====>                                             ]  39.75MB/354MB
 d130c3fa3ccc Downloading [==================================>                ]  138.8MB/200.9MB
 948ecd43a4a0 Downloading [=========================>                         ]  102.8MB/198.8MB
 87e0a2d3c153 Downloading [======>                                            ]  45.11MB/354MB
 87e0a2d3c153 Downloading [======>                                            ]  45.65MB/354MB
 d130c3fa3ccc Downloading [===================================>               ]  142.1MB/200.9MB
 948ecd43a4a0 Downloading [==========================>                        ]  103.9MB/198.8MB
 d130c3fa3ccc Downloading [===================================>               ]  142.6MB/200.9MB
 948ecd43a4a0 Downloading [==========================>                        ]  104.4MB/198.8MB
 87e0a2d3c153 Downloading [======>                                            ]  46.19MB/354MB
 d130c3fa3ccc Downloading [===================================>               ]  144.2MB/200.9MB
 948ecd43a4a0 Downloading [==========================>                        ]  106.1MB/198.8MB
 d130c3fa3ccc Downloading [====================================>              ]  144.7MB/200.9MB
 87e0a2d3c153 Downloading [======>                                            ]  47.79MB/354MB
 948ecd43a4a0 Downloading [==========================>                        ]  106.6MB/198.8MB
 d130c3fa3ccc Downloading [====================================>              ]  145.3MB/200.9MB
 87e0a2d3c153 Downloading [======>                                            ]  48.31MB/354MB
 948ecd43a4a0 Downloading [==========================>                        ]  107.1MB/198.8MB
 87e0a2d3c153 Downloading [======>                                            ]  49.39MB/354MB
 d130c3fa3ccc Downloading [====================================>              ]  145.8MB/200.9MB
 948ecd43a4a0 Downloading [===========================>                       ]  107.7MB/198.8MB
 87e0a2d3c153 Downloading [=======>                                           ]  49.91MB/354MB
 d130c3fa3ccc Downloading [====================================>              ]  146.4MB/200.9MB
 948ecd43a4a0 Downloading [===========================>                       ]  108.2MB/198.8MB
 87e0a2d3c153 Downloading [=======>                                           ]  50.45MB/354MB
 d130c3fa3ccc Downloading [====================================>              ]  146.9MB/200.9MB
 948ecd43a4a0 Downloading [===========================>                       ]  109.3MB/198.8MB
 87e0a2d3c153 Downloading [=======>                                           ]  50.99MB/354MB
 948ecd43a4a0 Downloading [===========================>                       ]  109.8MB/198.8MB
 d130c3fa3ccc Downloading [====================================>              ]  148.5MB/200.9MB
 d130c3fa3ccc Downloading [=====================================>             ]  149.1MB/200.9MB
 87e0a2d3c153 Downloading [=======>                                           ]  52.05MB/354MB
 948ecd43a4a0 Downloading [===========================>                       ]  110.9MB/198.8MB
 87e0a2d3c153 Downloading [=======>                                           ]  53.13MB/354MB
 d130c3fa3ccc Downloading [=====================================>             ]  149.6MB/200.9MB
 948ecd43a4a0 Downloading [============================>                      ]  115.2MB/198.8MB
 d130c3fa3ccc Downloading [======================================>            ]  152.8MB/200.9MB
 87e0a2d3c153 Downloading [=======>                                           ]  55.81MB/354MB
 948ecd43a4a0 Downloading [=============================>                     ]  116.2MB/198.8MB
 d130c3fa3ccc Downloading [======================================>            ]  154.4MB/200.9MB
 948ecd43a4a0 Downloading [=============================>                     ]  117.8MB/198.8MB
 87e0a2d3c153 Downloading [========>                                          ]  57.41MB/354MB
 d130c3fa3ccc Downloading [======================================>            ]    156MB/200.9MB
 948ecd43a4a0 Downloading [==============================>                    ]  119.5MB/198.8MB
 87e0a2d3c153 Downloading [========>                                          ]  59.02MB/354MB
 d130c3fa3ccc Downloading [=======================================>           ]  157.6MB/200.9MB
 948ecd43a4a0 Downloading [==============================>                    ]    121MB/198.8MB
 87e0a2d3c153 Downloading [========>                                          ]  60.62MB/354MB
 d130c3fa3ccc Downloading [=======================================>           ]  158.1MB/200.9MB
 948ecd43a4a0 Downloading [==============================>                    ]  122.1MB/198.8MB
 87e0a2d3c153 Downloading [========>                                          ]   61.7MB/354MB
 d130c3fa3ccc Downloading [=======================================>           ]  159.2MB/200.9MB
 948ecd43a4a0 Downloading [===============================>                   ]  124.3MB/198.8MB
 87e0a2d3c153 Downloading [========>                                          ]  62.78MB/354MB
 d130c3fa3ccc Downloading [========================================>          ]  160.8MB/200.9MB
 948ecd43a4a0 Downloading [===============================>                   ]  125.9MB/198.8MB
 87e0a2d3c153 Downloading [=========>                                         ]  64.92MB/354MB
 d130c3fa3ccc Downloading [========================================>          ]  162.4MB/200.9MB
 948ecd43a4a0 Downloading [=================================>                 ]    135MB/198.8MB
 87e0a2d3c153 Downloading [=========>                                         ]  69.76MB/354MB
 d130c3fa3ccc Downloading [==========================================>        ]    171MB/200.9MB
 87e0a2d3c153 Downloading [==========>                                        ]  77.28MB/354MB
 948ecd43a4a0 Downloading [===================================>               ]    142MB/198.8MB
 d130c3fa3ccc Downloading [===========================================>       ]  173.1MB/200.9MB
 948ecd43a4a0 Downloading [====================================>              ]  144.1MB/198.8MB
 87e0a2d3c153 Downloading [===========>                                       ]  79.97MB/354MB
 948ecd43a4a0 Downloading [=====================================>             ]  150.5MB/198.8MB
 d130c3fa3ccc Downloading [===========================================>       ]  175.8MB/200.9MB
 87e0a2d3c153 Downloading [===========>                                       ]  84.81MB/354MB
 948ecd43a4a0 Downloading [=======================================>           ]  155.9MB/198.8MB
 d130c3fa3ccc Downloading [============================================>      ]  180.1MB/200.9MB
 87e0a2d3c153 Downloading [=============>                                     ]  93.37MB/354MB
 948ecd43a4a0 Downloading [=========================================>         ]    165MB/198.8MB
 87e0a2d3c153 Downloading [=============>                                     ]  96.59MB/354MB
 d130c3fa3ccc Downloading [=============================================>     ]  182.7MB/200.9MB
 948ecd43a4a0 Downloading [==========================================>        ]  168.2MB/198.8MB
 87e0a2d3c153 Downloading [==============>                                    ]   99.3MB/354MB
 948ecd43a4a0 Downloading [==========================================>        ]  169.3MB/198.8MB
 87e0a2d3c153 Downloading [==============>                                    ]  99.82MB/354MB
 d130c3fa3ccc Downloading [=============================================>     ]  184.4MB/200.9MB
 948ecd43a4a0 Downloading [==========================================>        ]  169.8MB/198.8MB
 87e0a2d3c153 Downloading [==============>                                    ]  100.4MB/354MB
 87e0a2d3c153 Downloading [==============>                                    ]  100.9MB/354MB
 d130c3fa3ccc Downloading [==============================================>    ]  185.4MB/200.9MB
 948ecd43a4a0 Downloading [==========================================>        ]  170.9MB/198.8MB
 87e0a2d3c153 Downloading [==============>                                    ]  101.4MB/354MB
 d130c3fa3ccc Downloading [==============================================>    ]  186.5MB/200.9MB
 948ecd43a4a0 Downloading [===========================================>       ]  171.9MB/198.8MB
 87e0a2d3c153 Downloading [==============>                                    ]  102.5MB/354MB
 948ecd43a4a0 Downloading [===========================================>       ]  172.5MB/198.8MB
 d130c3fa3ccc Downloading [==============================================>    ]  187.6MB/200.9MB
 87e0a2d3c153 Downloading [==============>                                    ]  103.6MB/354MB
 948ecd43a4a0 Downloading [===========================================>       ]  173.6MB/198.8MB
 d130c3fa3ccc Downloading [==============================================>    ]  188.6MB/200.9MB
 87e0a2d3c153 Downloading [==============>                                    ]  104.7MB/354MB
 87e0a2d3c153 Downloading [==============>                                    ]  105.7MB/354MB
 d130c3fa3ccc Downloading [===============================================>   ]  189.7MB/200.9MB
 948ecd43a4a0 Downloading [===========================================>       ]  174.6MB/198.8MB
 d130c3fa3ccc Downloading [===============================================>   ]  190.8MB/200.9MB
 87e0a2d3c153 Downloading [===============>                                   ]  106.8MB/354MB
 948ecd43a4a0 Downloading [============================================>      ]  176.8MB/198.8MB
 d130c3fa3ccc Downloading [=================================================> ]  200.5MB/200.9MB
 d130c3fa3ccc Verifying Checksum 
 d130c3fa3ccc Download complete 
 948ecd43a4a0 Downloading [==============================================>    ]  184.3MB/198.8MB
 87e0a2d3c153 Downloading [================>                                  ]  119.1MB/354MB
 948ecd43a4a0 Downloading [==============================================>    ]  185.4MB/198.8MB
 87e0a2d3c153 Downloading [================>                                  ]  120.2MB/354MB
 948ecd43a4a0 Downloading [==============================================>    ]  186.4MB/198.8MB
 87e0a2d3c153 Downloading [=================>                                 ]  121.8MB/354MB
 948ecd43a4a0 Downloading [===============================================>   ]  188.6MB/198.8MB
 24f1f24f8e6b Downloading [>                                                  ]  1.378kB/82.43kB
 24f1f24f8e6b Downloading [==================================================>]  82.43kB/82.43kB
 24f1f24f8e6b Verifying Checksum 
 24f1f24f8e6b Download complete 
 87e0a2d3c153 Downloading [=================>                                 ]  122.9MB/354MB
 948ecd43a4a0 Downloading [===============================================>   ]  190.2MB/198.8MB
 87e0a2d3c153 Downloading [=================>                                 ]  123.4MB/354MB
 948ecd43a4a0 Downloading [===============================================>   ]  190.7MB/198.8MB
 87e0a2d3c153 Downloading [=================>                                 ]  125.5MB/354MB
 948ecd43a4a0 Downloading [================================================>  ]  191.8MB/198.8MB
 d130c3fa3ccc Extracting [>                                                  ]  557.1kB/200.9MB
 948ecd43a4a0 Downloading [================================================>  ]  193.4MB/198.8MB
 87e0a2d3c153 Downloading [=================>                                 ]  126.1MB/354MB
 948ecd43a4a0 Downloading [================================================>  ]  193.9MB/198.8MB
 87e0a2d3c153 Downloading [==================>                                ]  127.7MB/354MB
 948ecd43a4a0 Downloading [================================================>  ]  194.5MB/198.8MB
 21cd48f978f5 Downloading [=============>                                     ]  1.378kB/4.961kB
 21cd48f978f5 Downloading [==================================================>]  4.961kB/4.961kB
 21cd48f978f5 Verifying Checksum 
 21cd48f978f5 Download complete 
 87e0a2d3c153 Downloading [==================>                                ]  128.2MB/354MB
 948ecd43a4a0 Downloading [=================================================> ]  197.1MB/198.8MB
 87e0a2d3c153 Downloading [==================>                                ]  129.3MB/354MB
 948ecd43a4a0 Verifying Checksum 
 948ecd43a4a0 Download complete 
 87e0a2d3c153 Downloading [==================>                                ]  131.5MB/354MB
 87e0a2d3c153 Downloading [===================>                               ]  139.5MB/354MB
 87e0a2d3c153 Downloading [====================>                              ]  148.6MB/354MB
 87e0a2d3c153 Downloading [=====================>                             ]    154MB/354MB
 87e0a2d3c153 Downloading [=====================>                             ]  154.5MB/354MB
 be6d2862a83a Downloading [==================================================>]     377B/377B
 be6d2862a83a Verifying Checksum 
 be6d2862a83a Download complete 
 948ecd43a4a0 Extracting [>                                                  ]  557.1kB/198.8MB
 87e0a2d3c153 Downloading [======================>                            ]  156.7MB/354MB
 e4eddf6308cc Downloading [==================================================>]     151B/151B
 e4eddf6308cc Verifying Checksum 
 e4eddf6308cc Download complete 
 87e0a2d3c153 Downloading [========================>                          ]    170MB/354MB
 87e0a2d3c153 Downloading [=========================>                         ]  177.5MB/354MB
 d130c3fa3ccc Extracting [>                                                  ]  1.114MB/200.9MB
 87e0a2d3c153 Downloading [=========================>                         ]  180.7MB/354MB
 87e0a2d3c153 Downloading [=========================>                         ]  181.8MB/354MB
 948ecd43a4a0 Extracting [>                                                  ]  1.114MB/198.8MB
 87e0a2d3c153 Downloading [==========================>                        ]  189.9MB/354MB
 205c3766881b Downloading [================================>                  ]  1.378kB/2.131kB
 205c3766881b Downloading [==================================================>]  2.131kB/2.131kB
 205c3766881b Verifying Checksum 
 205c3766881b Download complete 
 297ac77fe774 Downloading [================================>                  ]  1.378kB/2.121kB
 297ac77fe774 Downloading [==================================================>]  2.121kB/2.121kB
 297ac77fe774 Verifying Checksum 
 297ac77fe774 Download complete 
 87e0a2d3c153 Downloading [===========================>                       ]  196.3MB/354MB
 d130c3fa3ccc Extracting [>                                                  ]  1.671MB/200.9MB
 87e0a2d3c153 Downloading [=============================>                     ]  205.4MB/354MB
 948ecd43a4a0 Extracting [>                                                  ]  2.228MB/198.8MB
 87e0a2d3c153 Downloading [=============================>                     ]  211.8MB/354MB
 87e0a2d3c153 Downloading [==============================>                    ]  213.4MB/354MB
 87e0a2d3c153 Downloading [==============================>                    ]  214.5MB/354MB
 948ecd43a4a0 Extracting [>                                                  ]  2.785MB/198.8MB
 87e0a2d3c153 Downloading [==============================>                    ]  216.1MB/354MB
 87e0a2d3c153 Downloading [==============================>                    ]  219.3MB/354MB
 87e0a2d3c153 Downloading [===============================>                   ]  221.9MB/354MB
 87e0a2d3c153 Downloading [================================>                  ]  227.3MB/354MB
 87e0a2d3c153 Downloading [=================================>                 ]  236.4MB/354MB
 d130c3fa3ccc Extracting [>                                                  ]  2.228MB/200.9MB
 948ecd43a4a0 Extracting [>                                                  ]  3.342MB/198.8MB
 87e0a2d3c153 Downloading [=================================>                 ]  240.1MB/354MB
 87e0a2d3c153 Downloading [=================================>                 ]  240.7MB/354MB
 948ecd43a4a0 Extracting [>                                                  ]  3.899MB/198.8MB
 d130c3fa3ccc Extracting [>                                                  ]  2.785MB/200.9MB
 87e0a2d3c153 Downloading [==================================>                ]  243.9MB/354MB
 948ecd43a4a0 Extracting [=>                                                 ]  4.456MB/198.8MB
 87e0a2d3c153 Downloading [===================================>               ]    253MB/354MB
 d130c3fa3ccc Extracting [>                                                  ]  3.342MB/200.9MB
 948ecd43a4a0 Extracting [=>                                                 ]  5.014MB/198.8MB
 87e0a2d3c153 Downloading [====================================>              ]  261.6MB/354MB
 d130c3fa3ccc Extracting [=>                                                 ]  4.456MB/200.9MB
 87e0a2d3c153 Downloading [=====================================>             ]  264.2MB/354MB
 87e0a2d3c153 Downloading [=====================================>             ]  264.8MB/354MB
 948ecd43a4a0 Extracting [=>                                                 ]  5.571MB/198.8MB
 d130c3fa3ccc Extracting [=>                                                 ]  5.014MB/200.9MB
 87e0a2d3c153 Downloading [=====================================>             ]  265.3MB/354MB
 87e0a2d3c153 Downloading [=====================================>             ]  266.9MB/354MB
 948ecd43a4a0 Extracting [=>                                                 ]  6.128MB/198.8MB
 d130c3fa3ccc Extracting [=>                                                 ]  5.571MB/200.9MB
 87e0a2d3c153 Downloading [=====================================>             ]  267.4MB/354MB
 87e0a2d3c153 Downloading [======================================>            ]  271.2MB/354MB
 d130c3fa3ccc Extracting [=>                                                 ]  6.128MB/200.9MB
 948ecd43a4a0 Extracting [=>                                                 ]  6.685MB/198.8MB
 87e0a2d3c153 Downloading [======================================>            ]    276MB/354MB
 87e0a2d3c153 Downloading [=======================================>           ]  282.4MB/354MB
 87e0a2d3c153 Downloading [========================================>          ]  287.8MB/354MB
 87e0a2d3c153 Downloading [=========================================>         ]  294.2MB/354MB
 948ecd43a4a0 Extracting [=>                                                 ]  7.242MB/198.8MB
 87e0a2d3c153 Downloading [=========================================>         ]  295.9MB/354MB
 d130c3fa3ccc Extracting [=>                                                 ]  6.685MB/200.9MB
 87e0a2d3c153 Downloading [==========================================>        ]  301.2MB/354MB
 948ecd43a4a0 Extracting [=>                                                 ]  7.799MB/198.8MB
 87e0a2d3c153 Downloading [============================================>      ]  312.5MB/354MB
 87e0a2d3c153 Downloading [============================================>      ]  316.8MB/354MB
 948ecd43a4a0 Extracting [==>                                                ]  8.356MB/198.8MB
 87e0a2d3c153 Downloading [============================================>      ]  317.3MB/354MB
 87e0a2d3c153 Downloading [============================================>      ]  317.9MB/354MB
 948ecd43a4a0 Extracting [==>                                                ]  8.913MB/198.8MB
 d130c3fa3ccc Extracting [=>                                                 ]  7.242MB/200.9MB
 87e0a2d3c153 Downloading [=============================================>     ]  321.6MB/354MB
 948ecd43a4a0 Extracting [==>                                                ]   9.47MB/198.8MB
 d130c3fa3ccc Extracting [=>                                                 ]  7.799MB/200.9MB
 87e0a2d3c153 Downloading [==============================================>    ]    327MB/354MB
 948ecd43a4a0 Extracting [==>                                                ]  10.03MB/198.8MB
 87e0a2d3c153 Downloading [==============================================>    ]  328.1MB/354MB
 d130c3fa3ccc Extracting [==>                                                ]  8.356MB/200.9MB
 948ecd43a4a0 Extracting [==>                                                ]  10.58MB/198.8MB
 87e0a2d3c153 Downloading [==============================================>    ]  329.1MB/354MB
 d130c3fa3ccc Extracting [==>                                                ]  8.913MB/200.9MB
 87e0a2d3c153 Downloading [===============================================>   ]    334MB/354MB
 948ecd43a4a0 Extracting [==>                                                ]  11.14MB/198.8MB
 87e0a2d3c153 Downloading [===============================================>   ]  337.7MB/354MB
 d130c3fa3ccc Extracting [==>                                                ]   9.47MB/200.9MB
 87e0a2d3c153 Downloading [================================================>  ]  343.1MB/354MB
 87e0a2d3c153 Verifying Checksum 
 87e0a2d3c153 Download complete 
 948ecd43a4a0 Extracting [==>                                                ]   11.7MB/198.8MB
 d130c3fa3ccc Extracting [==>                                                ]  10.03MB/200.9MB
 d130c3fa3ccc Extracting [==>                                                ]  11.14MB/200.9MB
 948ecd43a4a0 Extracting [===>                                               ]  12.81MB/198.8MB
 948ecd43a4a0 Extracting [===>                                               ]  14.48MB/198.8MB
 d130c3fa3ccc Extracting [===>                                               ]  12.81MB/200.9MB
 d130c3fa3ccc Extracting [===>                                               ]  13.93MB/200.9MB
 948ecd43a4a0 Extracting [====>                                              ]  16.15MB/198.8MB
 d130c3fa3ccc Extracting [===>                                               ]  14.48MB/200.9MB
 948ecd43a4a0 Extracting [====>                                              ]  16.71MB/198.8MB
 d130c3fa3ccc Extracting [===>                                               ]  15.04MB/200.9MB
 948ecd43a4a0 Extracting [====>                                              ]  17.27MB/198.8MB
 d130c3fa3ccc Extracting [===>                                               ]   15.6MB/200.9MB
 d130c3fa3ccc Extracting [====>                                              ]  16.71MB/200.9MB
 948ecd43a4a0 Extracting [====>                                              ]  18.38MB/198.8MB
 d130c3fa3ccc Extracting [====>                                              ]  17.83MB/200.9MB
 948ecd43a4a0 Extracting [====>                                              ]   19.5MB/198.8MB
 d130c3fa3ccc Extracting [====>                                              ]  18.94MB/200.9MB
 d130c3fa3ccc Extracting [====>                                              ]  20.05MB/200.9MB
 948ecd43a4a0 Extracting [=====>                                             ]  20.61MB/198.8MB
 d130c3fa3ccc Extracting [=====>                                             ]  21.17MB/200.9MB
 948ecd43a4a0 Extracting [=====>                                             ]  21.73MB/198.8MB
 d130c3fa3ccc Extracting [=====>                                             ]  21.73MB/200.9MB
 948ecd43a4a0 Extracting [=====>                                             ]  22.28MB/198.8MB
 d130c3fa3ccc Extracting [=====>                                             ]  22.28MB/200.9MB
 948ecd43a4a0 Extracting [=====>                                             ]  22.84MB/198.8MB
 948ecd43a4a0 Extracting [=====>                                             ]   23.4MB/198.8MB
 d130c3fa3ccc Extracting [=====>                                             ]  22.84MB/200.9MB
 948ecd43a4a0 Extracting [======>                                            ]  23.95MB/198.8MB
 948ecd43a4a0 Extracting [======>                                            ]  24.51MB/198.8MB
 d130c3fa3ccc Extracting [=====>                                             ]   23.4MB/200.9MB
 948ecd43a4a0 Extracting [======>                                            ]  25.07MB/198.8MB
 948ecd43a4a0 Extracting [======>                                            ]   27.3MB/198.8MB
 d130c3fa3ccc Extracting [======>                                            ]  25.07MB/200.9MB
 d130c3fa3ccc Extracting [======>                                            ]  25.62MB/200.9MB
 948ecd43a4a0 Extracting [=======>                                           ]  28.41MB/198.8MB
 d130c3fa3ccc Extracting [======>                                            ]  26.18MB/200.9MB
 948ecd43a4a0 Extracting [=======>                                           ]  28.97MB/198.8MB
 d130c3fa3ccc Extracting [======>                                            ]  26.74MB/200.9MB
 948ecd43a4a0 Extracting [=======>                                           ]  30.64MB/198.8MB
 d130c3fa3ccc Extracting [=======>                                           ]  28.97MB/200.9MB
 948ecd43a4a0 Extracting [========>                                          ]  32.31MB/198.8MB
 948ecd43a4a0 Extracting [========>                                          ]  32.87MB/198.8MB
 d130c3fa3ccc Extracting [=======>                                           ]  30.08MB/200.9MB
 948ecd43a4a0 Extracting [========>                                          ]  33.42MB/198.8MB
 d130c3fa3ccc Extracting [=======>                                           ]   31.2MB/200.9MB
 948ecd43a4a0 Extracting [========>                                          ]  34.54MB/198.8MB
 d130c3fa3ccc Extracting [=======>                                           ]  31.75MB/200.9MB
 948ecd43a4a0 Extracting [========>                                          ]  35.09MB/198.8MB
 d130c3fa3ccc Extracting [========>                                          ]  32.31MB/200.9MB
 d130c3fa3ccc Extracting [========>                                          ]  32.87MB/200.9MB
 948ecd43a4a0 Extracting [=========>                                         ]  36.21MB/198.8MB
 948ecd43a4a0 Extracting [=========>                                         ]  36.77MB/198.8MB
 d130c3fa3ccc Extracting [========>                                          ]  33.98MB/200.9MB
 948ecd43a4a0 Extracting [=========>                                         ]  37.32MB/198.8MB
 d130c3fa3ccc Extracting [========>                                          ]  34.54MB/200.9MB
 948ecd43a4a0 Extracting [=========>                                         ]  37.88MB/198.8MB
 948ecd43a4a0 Extracting [=========>                                         ]  38.44MB/198.8MB
 d130c3fa3ccc Extracting [========>                                          ]  35.09MB/200.9MB
 948ecd43a4a0 Extracting [=========>                                         ]  38.99MB/198.8MB
 d130c3fa3ccc Extracting [========>                                          ]  35.65MB/200.9MB
 d130c3fa3ccc Extracting [=========>                                         ]  36.77MB/200.9MB
 948ecd43a4a0 Extracting [==========>                                        ]  40.11MB/198.8MB
 d130c3fa3ccc Extracting [=========>                                         ]  37.32MB/200.9MB
 948ecd43a4a0 Extracting [==========>                                        ]  41.22MB/198.8MB
 d130c3fa3ccc Extracting [=========>                                         ]  38.44MB/200.9MB
 948ecd43a4a0 Extracting [==========>                                        ]  43.45MB/198.8MB
 d130c3fa3ccc Extracting [==========>                                        ]  40.67MB/200.9MB
 948ecd43a4a0 Extracting [===========>                                       ]  45.68MB/198.8MB
 d130c3fa3ccc Extracting [==========>                                        ]  42.34MB/200.9MB
 948ecd43a4a0 Extracting [===========>                                       ]  46.79MB/198.8MB
 d130c3fa3ccc Extracting [==========>                                        ]  43.45MB/200.9MB
 948ecd43a4a0 Extracting [============>                                      ]  48.46MB/198.8MB
 948ecd43a4a0 Extracting [============>                                      ]  49.58MB/198.8MB
 d130c3fa3ccc Extracting [===========>                                       ]  45.12MB/200.9MB
 948ecd43a4a0 Extracting [============>                                      ]  50.69MB/198.8MB
 d130c3fa3ccc Extracting [===========>                                       ]  46.24MB/200.9MB
 948ecd43a4a0 Extracting [=============>                                     ]  52.36MB/198.8MB
 d130c3fa3ccc Extracting [===========>                                       ]  47.91MB/200.9MB
 948ecd43a4a0 Extracting [=============>                                     ]  53.48MB/198.8MB
 d130c3fa3ccc Extracting [============>                                      ]  49.02MB/200.9MB
 948ecd43a4a0 Extracting [=============>                                     ]  54.59MB/198.8MB
 d130c3fa3ccc Extracting [============>                                      ]  51.25MB/200.9MB
 948ecd43a4a0 Extracting [==============>                                    ]  56.82MB/198.8MB
 948ecd43a4a0 Extracting [==============>                                    ]  58.49MB/198.8MB
 d130c3fa3ccc Extracting [=============>                                     ]  52.92MB/200.9MB
 948ecd43a4a0 Extracting [==============>                                    ]   59.6MB/198.8MB
 d130c3fa3ccc Extracting [=============>                                     ]  54.03MB/200.9MB
 948ecd43a4a0 Extracting [===============>                                   ]  60.72MB/198.8MB
 d130c3fa3ccc Extracting [=============>                                     ]  55.15MB/200.9MB
 948ecd43a4a0 Extracting [===============>                                   ]  62.95MB/198.8MB
 d130c3fa3ccc Extracting [==============>                                    ]  57.38MB/200.9MB
 948ecd43a4a0 Extracting [================>                                  ]  65.18MB/198.8MB
 d130c3fa3ccc Extracting [==============>                                    ]   59.6MB/200.9MB
 948ecd43a4a0 Extracting [================>                                  ]  66.29MB/198.8MB
 d130c3fa3ccc Extracting [===============>                                   ]  60.72MB/200.9MB
 948ecd43a4a0 Extracting [================>                                  ]  66.85MB/198.8MB
 d130c3fa3ccc Extracting [===============>                                   ]  61.83MB/200.9MB
 d130c3fa3ccc Extracting [===============>                                   ]  62.39MB/200.9MB
 948ecd43a4a0 Extracting [================>                                  ]   67.4MB/198.8MB
 948ecd43a4a0 Extracting [=================>                                 ]  67.96MB/198.8MB
 d130c3fa3ccc Extracting [===============>                                   ]   63.5MB/200.9MB
 948ecd43a4a0 Extracting [=================>                                 ]  68.52MB/198.8MB
 d130c3fa3ccc Extracting [================>                                  ]  64.62MB/200.9MB
 948ecd43a4a0 Extracting [=================>                                 ]  69.63MB/198.8MB
 d130c3fa3ccc Extracting [================>                                  ]  66.29MB/200.9MB
 948ecd43a4a0 Extracting [=================>                                 ]   71.3MB/198.8MB
 d130c3fa3ccc Extracting [================>                                  ]   67.4MB/200.9MB
 948ecd43a4a0 Extracting [==================>                                ]  72.42MB/198.8MB
 d130c3fa3ccc Extracting [=================>                                 ]  69.63MB/200.9MB
 948ecd43a4a0 Extracting [==================>                                ]  74.09MB/198.8MB
 d130c3fa3ccc Extracting [=================>                                 ]  70.75MB/200.9MB
 948ecd43a4a0 Extracting [==================>                                ]   75.2MB/198.8MB
 d130c3fa3ccc Extracting [==================>                                ]  72.42MB/200.9MB
 948ecd43a4a0 Extracting [===================>                               ]  76.32MB/198.8MB
 948ecd43a4a0 Extracting [===================>                               ]  77.43MB/198.8MB
 d130c3fa3ccc Extracting [==================>                                ]  74.09MB/200.9MB
 948ecd43a4a0 Extracting [===================>                               ]   79.1MB/198.8MB
 d130c3fa3ccc Extracting [==================>                                ]  76.32MB/200.9MB
 948ecd43a4a0 Extracting [====================>                              ]  80.22MB/198.8MB
 d130c3fa3ccc Extracting [===================>                               ]  77.43MB/200.9MB
 948ecd43a4a0 Extracting [====================>                              ]  81.33MB/198.8MB
 d130c3fa3ccc Extracting [===================>                               ]   79.1MB/200.9MB
 948ecd43a4a0 Extracting [====================>                              ]     83MB/198.8MB
 d130c3fa3ccc Extracting [===================>                               ]  80.22MB/200.9MB
 948ecd43a4a0 Extracting [=====================>                             ]  84.12MB/198.8MB
 d130c3fa3ccc Extracting [====================>                              ]  82.44MB/200.9MB
 948ecd43a4a0 Extracting [=====================>                             ]  86.34MB/198.8MB
 d130c3fa3ccc Extracting [====================>                              ]  84.12MB/200.9MB
 948ecd43a4a0 Extracting [======================>                            ]  88.01MB/198.8MB
 d130c3fa3ccc Extracting [=====================>                             ]  85.79MB/200.9MB
 948ecd43a4a0 Extracting [======================>                            ]  90.24MB/198.8MB
 948ecd43a4a0 Extracting [=======================>                           ]  91.91MB/198.8MB
 d130c3fa3ccc Extracting [=====================>                             ]  88.01MB/200.9MB
 d130c3fa3ccc Extracting [======================>                            ]  90.24MB/200.9MB
 948ecd43a4a0 Extracting [=======================>                           ]   94.7MB/198.8MB
 d130c3fa3ccc Extracting [======================>                            ]  91.91MB/200.9MB
 948ecd43a4a0 Extracting [========================>                          ]  96.93MB/198.8MB
 d130c3fa3ccc Extracting [=======================>                           ]  93.59MB/200.9MB
 948ecd43a4a0 Extracting [========================>                          ]   98.6MB/198.8MB
 d130c3fa3ccc Extracting [=======================>                           ]  95.26MB/200.9MB
 948ecd43a4a0 Extracting [=========================>                         ]  100.8MB/198.8MB
 948ecd43a4a0 Extracting [=========================>                         ]  103.1MB/198.8MB
 d130c3fa3ccc Extracting [========================>                          ]  98.04MB/200.9MB
 d130c3fa3ccc Extracting [========================>                          ]  100.3MB/200.9MB
 948ecd43a4a0 Extracting [==========================>                        ]  105.8MB/198.8MB
 d130c3fa3ccc Extracting [=========================>                         ]  101.9MB/200.9MB
 948ecd43a4a0 Extracting [===========================>                       ]  108.1MB/198.8MB
 d130c3fa3ccc Extracting [=========================>                         ]  103.6MB/200.9MB
 948ecd43a4a0 Extracting [===========================>                       ]  110.3MB/198.8MB
 d130c3fa3ccc Extracting [==========================>                        ]  106.4MB/200.9MB
 948ecd43a4a0 Extracting [============================>                      ]  113.1MB/198.8MB
 948ecd43a4a0 Extracting [============================>                      ]  114.2MB/198.8MB
 d130c3fa3ccc Extracting [==========================>                        ]  107.5MB/200.9MB
 948ecd43a4a0 Extracting [============================>                      ]  115.3MB/198.8MB
 d130c3fa3ccc Extracting [===========================>                       ]  109.7MB/200.9MB
 948ecd43a4a0 Extracting [=============================>                     ]  117.5MB/198.8MB
 d130c3fa3ccc Extracting [===========================>                       ]    112MB/200.9MB
 948ecd43a4a0 Extracting [==============================>                    ]  119.8MB/198.8MB
 d130c3fa3ccc Extracting [============================>                      ]  114.2MB/200.9MB
 948ecd43a4a0 Extracting [==============================>                    ]    122MB/198.8MB
 d130c3fa3ccc Extracting [=============================>                     ]    117MB/200.9MB
 948ecd43a4a0 Extracting [===============================>                   ]  123.7MB/198.8MB
 d130c3fa3ccc Extracting [=============================>                     ]  118.1MB/200.9MB
 948ecd43a4a0 Extracting [===============================>                   ]  124.2MB/198.8MB
 d130c3fa3ccc Extracting [=============================>                     ]  118.7MB/200.9MB
 948ecd43a4a0 Extracting [===============================>                   ]  125.3MB/198.8MB
 d130c3fa3ccc Extracting [=============================>                     ]  119.8MB/200.9MB
 948ecd43a4a0 Extracting [================================>                  ]  127.6MB/198.8MB
 d130c3fa3ccc Extracting [==============================>                    ]    122MB/200.9MB
 948ecd43a4a0 Extracting [================================>                  ]  128.7MB/198.8MB
 d130c3fa3ccc Extracting [===============================>                   ]  124.8MB/200.9MB
 948ecd43a4a0 Extracting [================================>                  ]  130.9MB/198.8MB
 948ecd43a4a0 Extracting [=================================>                 ]    132MB/198.8MB
 d130c3fa3ccc Extracting [===============================>                   ]  126.5MB/200.9MB
 d130c3fa3ccc Extracting [===============================>                   ]    127MB/200.9MB
 948ecd43a4a0 Extracting [=================================>                 ]  132.6MB/198.8MB
 d130c3fa3ccc Extracting [===============================>                   ]  127.6MB/200.9MB
 948ecd43a4a0 Extracting [=================================>                 ]  133.1MB/198.8MB
 d130c3fa3ccc Extracting [===============================>                   ]  128.1MB/200.9MB
 948ecd43a4a0 Extracting [=================================>                 ]  133.7MB/198.8MB
 d130c3fa3ccc Extracting [================================>                  ]  128.7MB/200.9MB
 948ecd43a4a0 Extracting [=================================>                 ]  134.3MB/198.8MB
 d130c3fa3ccc Extracting [================================>                  ]  129.2MB/200.9MB
 948ecd43a4a0 Extracting [=================================>                 ]  134.8MB/198.8MB
 d130c3fa3ccc Extracting [================================>                  ]  129.8MB/200.9MB
 948ecd43a4a0 Extracting [==================================>                ]  135.4MB/198.8MB
 948ecd43a4a0 Extracting [==================================>                ]  135.9MB/198.8MB
 d130c3fa3ccc Extracting [================================>                  ]  130.4MB/200.9MB
 948ecd43a4a0 Extracting [==================================>                ]  136.5MB/198.8MB
 d130c3fa3ccc Extracting [================================>                  ]  130.9MB/200.9MB
 948ecd43a4a0 Extracting [==================================>                ]  137.6MB/198.8MB
 d130c3fa3ccc Extracting [================================>                  ]  131.5MB/200.9MB
 d130c3fa3ccc Extracting [================================>                  ]    132MB/200.9MB
 948ecd43a4a0 Extracting [==================================>                ]  138.1MB/198.8MB
 d130c3fa3ccc Extracting [================================>                  ]  132.6MB/200.9MB
 d130c3fa3ccc Extracting [=================================>                 ]  133.1MB/200.9MB
 948ecd43a4a0 Extracting [==================================>                ]  138.7MB/198.8MB
 d130c3fa3ccc Extracting [=================================>                 ]  133.7MB/200.9MB
 948ecd43a4a0 Extracting [===================================>               ]  139.3MB/198.8MB
 d130c3fa3ccc Extracting [=================================>                 ]  134.3MB/200.9MB
 d130c3fa3ccc Extracting [=================================>                 ]  134.8MB/200.9MB
 948ecd43a4a0 Extracting [===================================>               ]  139.8MB/198.8MB
 d130c3fa3ccc Extracting [=================================>                 ]  135.9MB/200.9MB
 d130c3fa3ccc Extracting [=================================>                 ]  136.5MB/200.9MB
 948ecd43a4a0 Extracting [===================================>               ]  140.9MB/198.8MB
 d130c3fa3ccc Extracting [==================================>                ]    137MB/200.9MB
 948ecd43a4a0 Extracting [===================================>               ]  141.5MB/198.8MB
 d130c3fa3ccc Extracting [==================================>                ]  137.6MB/200.9MB
 948ecd43a4a0 Extracting [===================================>               ]    142MB/198.8MB
 d130c3fa3ccc Extracting [==================================>                ]  138.1MB/200.9MB
 948ecd43a4a0 Extracting [===================================>               ]  142.6MB/198.8MB
 d130c3fa3ccc Extracting [==================================>                ]  138.7MB/200.9MB
 d130c3fa3ccc Extracting [==================================>                ]  139.8MB/200.9MB
 948ecd43a4a0 Extracting [====================================>              ]  144.3MB/198.8MB
 948ecd43a4a0 Extracting [====================================>              ]  145.4MB/198.8MB
 d130c3fa3ccc Extracting [===================================>               ]  140.9MB/200.9MB
 948ecd43a4a0 Extracting [=====================================>             ]  148.2MB/198.8MB
 d130c3fa3ccc Extracting [===================================>               ]  143.7MB/200.9MB
 948ecd43a4a0 Extracting [=====================================>             ]    151MB/198.8MB
 d130c3fa3ccc Extracting [====================================>              ]  145.9MB/200.9MB
 948ecd43a4a0 Extracting [======================================>            ]  151.5MB/198.8MB
 d130c3fa3ccc Extracting [====================================>              ]  146.5MB/200.9MB
 948ecd43a4a0 Extracting [======================================>            ]  152.1MB/198.8MB
 d130c3fa3ccc Extracting [====================================>              ]  147.1MB/200.9MB
 948ecd43a4a0 Extracting [======================================>            ]  152.6MB/198.8MB
 d130c3fa3ccc Extracting [=====================================>             ]  148.7MB/200.9MB
 948ecd43a4a0 Extracting [======================================>            ]  154.3MB/198.8MB
 948ecd43a4a0 Extracting [======================================>            ]  154.9MB/198.8MB
 d130c3fa3ccc Extracting [=====================================>             ]  149.8MB/200.9MB
 d130c3fa3ccc Extracting [=====================================>             ]  150.4MB/200.9MB
 948ecd43a4a0 Extracting [=======================================>           ]  155.4MB/198.8MB
 d130c3fa3ccc Extracting [=====================================>             ]    151MB/200.9MB
 948ecd43a4a0 Extracting [=======================================>           ]    156MB/198.8MB
 d130c3fa3ccc Extracting [=====================================>             ]  151.5MB/200.9MB
 948ecd43a4a0 Extracting [=======================================>           ]  157.1MB/198.8MB
 d130c3fa3ccc Extracting [======================================>            ]  153.2MB/200.9MB
 948ecd43a4a0 Extracting [========================================>          ]  159.3MB/198.8MB
 d130c3fa3ccc Extracting [======================================>            ]  154.9MB/200.9MB
 948ecd43a4a0 Extracting [========================================>          ]    161MB/198.8MB
 d130c3fa3ccc Extracting [======================================>            ]  156.5MB/200.9MB
 948ecd43a4a0 Extracting [=========================================>         ]  163.8MB/198.8MB
 d130c3fa3ccc Extracting [=======================================>           ]  158.2MB/200.9MB
 948ecd43a4a0 Extracting [=========================================>         ]    166MB/198.8MB
 d130c3fa3ccc Extracting [=======================================>           ]  159.9MB/200.9MB
 948ecd43a4a0 Extracting [==========================================>        ]  168.8MB/198.8MB
 d130c3fa3ccc Extracting [========================================>          ]  162.1MB/200.9MB
 948ecd43a4a0 Extracting [===========================================>       ]  171.6MB/198.8MB
 d130c3fa3ccc Extracting [========================================>          ]  164.3MB/200.9MB
 948ecd43a4a0 Extracting [===========================================>       ]  173.8MB/198.8MB
 d130c3fa3ccc Extracting [=========================================>         ]    166MB/200.9MB
 948ecd43a4a0 Extracting [===========================================>       ]  174.9MB/198.8MB
 d130c3fa3ccc Extracting [=========================================>         ]  167.1MB/200.9MB
 948ecd43a4a0 Extracting [============================================>      ]  176.6MB/198.8MB
 d130c3fa3ccc Extracting [=========================================>         ]  168.2MB/200.9MB
 948ecd43a4a0 Extracting [============================================>      ]  178.3MB/198.8MB
 d130c3fa3ccc Extracting [==========================================>        ]  169.9MB/200.9MB
 948ecd43a4a0 Extracting [=============================================>     ]  179.9MB/198.8MB
 d130c3fa3ccc Extracting [==========================================>        ]  172.1MB/200.9MB
 948ecd43a4a0 Extracting [=============================================>     ]    181MB/198.8MB
 d130c3fa3ccc Extracting [===========================================>       ]  173.8MB/200.9MB
 948ecd43a4a0 Extracting [=============================================>     ]  182.2MB/198.8MB
 948ecd43a4a0 Extracting [=============================================>     ]  182.7MB/198.8MB
 d130c3fa3ccc Extracting [===========================================>       ]  174.9MB/200.9MB
 948ecd43a4a0 Extracting [==============================================>    ]  183.3MB/198.8MB
 d130c3fa3ccc Extracting [===========================================>       ]  175.5MB/200.9MB
 d130c3fa3ccc Extracting [===========================================>       ]    176MB/200.9MB
 948ecd43a4a0 Extracting [==============================================>    ]  183.8MB/198.8MB
 d130c3fa3ccc Extracting [===========================================>       ]  176.6MB/200.9MB
 d130c3fa3ccc Extracting [============================================>      ]  177.1MB/200.9MB
 948ecd43a4a0 Extracting [==============================================>    ]  184.9MB/198.8MB
 948ecd43a4a0 Extracting [==============================================>    ]  185.5MB/198.8MB
 d130c3fa3ccc Extracting [============================================>      ]  177.7MB/200.9MB
 948ecd43a4a0 Extracting [==============================================>    ]  186.1MB/198.8MB
 d130c3fa3ccc Extracting [============================================>      ]  178.3MB/200.9MB
 948ecd43a4a0 Extracting [==============================================>    ]  186.6MB/198.8MB
 d130c3fa3ccc Extracting [============================================>      ]  178.8MB/200.9MB
 948ecd43a4a0 Extracting [===============================================>   ]  187.2MB/198.8MB
 d130c3fa3ccc Extracting [============================================>      ]  179.9MB/200.9MB
 948ecd43a4a0 Extracting [===============================================>   ]  187.7MB/198.8MB
 d130c3fa3ccc Extracting [============================================>      ]  180.5MB/200.9MB
 d130c3fa3ccc Extracting [=============================================>     ]    181MB/200.9MB
 948ecd43a4a0 Extracting [===============================================>   ]  188.3MB/198.8MB
 d130c3fa3ccc Extracting [=============================================>     ]  181.6MB/200.9MB
 948ecd43a4a0 Extracting [===============================================>   ]  188.8MB/198.8MB
 948ecd43a4a0 Extracting [===============================================>   ]    190MB/198.8MB
 d130c3fa3ccc Extracting [=============================================>     ]  182.7MB/200.9MB
 948ecd43a4a0 Extracting [===============================================>   ]  190.5MB/198.8MB
 d130c3fa3ccc Extracting [=============================================>     ]  183.3MB/200.9MB
 948ecd43a4a0 Extracting [================================================>  ]  191.1MB/198.8MB
 d130c3fa3ccc Extracting [=============================================>     ]  183.8MB/200.9MB
 d130c3fa3ccc Extracting [==============================================>    ]  184.9MB/200.9MB
 948ecd43a4a0 Extracting [================================================>  ]  192.7MB/198.8MB
 d130c3fa3ccc Extracting [==============================================>    ]  185.5MB/200.9MB
 948ecd43a4a0 Extracting [================================================>  ]  193.3MB/198.8MB
 d130c3fa3ccc Extracting [==============================================>    ]  186.1MB/200.9MB
 948ecd43a4a0 Extracting [================================================>  ]  193.9MB/198.8MB
 948ecd43a4a0 Extracting [================================================>  ]  194.4MB/198.8MB
 d130c3fa3ccc Extracting [==============================================>    ]  187.2MB/200.9MB
 948ecd43a4a0 Extracting [=================================================> ]  195.5MB/198.8MB
 d130c3fa3ccc Extracting [==============================================>    ]  188.3MB/200.9MB
 948ecd43a4a0 Extracting [=================================================> ]  197.2MB/198.8MB
 d130c3fa3ccc Extracting [==============================================>    ]  188.8MB/200.9MB
 948ecd43a4a0 Extracting [=================================================> ]  198.3MB/198.8MB
 d130c3fa3ccc Extracting [===============================================>   ]  189.4MB/200.9MB
 948ecd43a4a0 Extracting [==================================================>]  198.8MB/198.8MB
 d130c3fa3ccc Extracting [===============================================>   ]    190MB/200.9MB
 948ecd43a4a0 Pull complete 
 e5caf8731a75 Extracting [==================================================>]  1.001kB/1.001kB
 e5caf8731a75 Extracting [==================================================>]  1.001kB/1.001kB
 e5caf8731a75 Pull complete 
 d130c3fa3ccc Extracting [===============================================>   ]  190.5MB/200.9MB
 87e0a2d3c153 Extracting [>                                                  ]  557.1kB/354MB
 87e0a2d3c153 Extracting [>                                                  ]  1.114MB/354MB
 d130c3fa3ccc Extracting [===============================================>   ]  191.6MB/200.9MB
 d130c3fa3ccc Extracting [===============================================>   ]  192.7MB/200.9MB
 87e0a2d3c153 Extracting [>                                                  ]  4.456MB/354MB
 d130c3fa3ccc Extracting [================================================>  ]  193.3MB/200.9MB
 87e0a2d3c153 Extracting [>                                                  ]  5.014MB/354MB
 87e0a2d3c153 Extracting [>                                                  ]  6.685MB/354MB
 87e0a2d3c153 Extracting [=>                                                 ]  7.242MB/354MB
 87e0a2d3c153 Extracting [=>                                                 ]  7.799MB/354MB
 87e0a2d3c153 Extracting [=>                                                 ]  8.356MB/354MB
 87e0a2d3c153 Extracting [=>                                                 ]  8.913MB/354MB
 d130c3fa3ccc Extracting [================================================>  ]  194.4MB/200.9MB
 87e0a2d3c153 Extracting [=>                                                 ]   9.47MB/354MB
 87e0a2d3c153 Extracting [=>                                                 ]  10.03MB/354MB
 87e0a2d3c153 Extracting [=>                                                 ]  10.58MB/354MB
 87e0a2d3c153 Extracting [=>                                                 ]  11.14MB/354MB
 87e0a2d3c153 Extracting [=>                                                 ]   11.7MB/354MB
 87e0a2d3c153 Extracting [=>                                                 ]  12.26MB/354MB
 d130c3fa3ccc Extracting [================================================>  ]    195MB/200.9MB
 87e0a2d3c153 Extracting [=>                                                 ]  12.81MB/354MB
 d130c3fa3ccc Extracting [================================================>  ]  195.5MB/200.9MB
 87e0a2d3c153 Extracting [=>                                                 ]  13.37MB/354MB
 d130c3fa3ccc Extracting [================================================>  ]  196.1MB/200.9MB
 87e0a2d3c153 Extracting [=>                                                 ]  13.93MB/354MB
 87e0a2d3c153 Extracting [==>                                                ]  14.48MB/354MB
 87e0a2d3c153 Extracting [==>                                                ]  15.04MB/354MB
 87e0a2d3c153 Extracting [==>                                                ]   15.6MB/354MB
 87e0a2d3c153 Extracting [==>                                                ]  16.15MB/354MB
 d130c3fa3ccc Extracting [================================================>  ]  196.6MB/200.9MB
 87e0a2d3c153 Extracting [==>                                                ]  16.71MB/354MB
 87e0a2d3c153 Extracting [==>                                                ]  17.27MB/354MB
 87e0a2d3c153 Extracting [==>                                                ]  17.83MB/354MB
 87e0a2d3c153 Extracting [==>                                                ]  18.38MB/354MB
 d130c3fa3ccc Extracting [=================================================> ]  197.2MB/200.9MB
 87e0a2d3c153 Extracting [==>                                                ]  18.94MB/354MB
 87e0a2d3c153 Extracting [==>                                                ]   19.5MB/354MB
 d130c3fa3ccc Extracting [=================================================> ]  197.8MB/200.9MB
 87e0a2d3c153 Extracting [==>                                                ]  20.05MB/354MB
 d130c3fa3ccc Extracting [=================================================> ]  198.3MB/200.9MB
 87e0a2d3c153 Extracting [===>                                               ]  22.28MB/354MB
 d130c3fa3ccc Extracting [=================================================> ]    200MB/200.9MB
 d130c3fa3ccc Extracting [==================================================>]  200.9MB/200.9MB
 87e0a2d3c153 Extracting [===>                                               ]  25.62MB/354MB
 87e0a2d3c153 Extracting [===>                                               ]   27.3MB/354MB
 87e0a2d3c153 Extracting [====>                                              ]  28.41MB/354MB
 87e0a2d3c153 Extracting [====>                                              ]  28.97MB/354MB
 87e0a2d3c153 Extracting [====>                                              ]  29.52MB/354MB
 87e0a2d3c153 Extracting [====>                                              ]  30.64MB/354MB
 87e0a2d3c153 Extracting [====>                                              ]  31.75MB/354MB
 87e0a2d3c153 Extracting [====>                                              ]  32.87MB/354MB
 d130c3fa3ccc Pull complete 
 4aec5a4fac9f Extracting [=============>                                     ]  32.77kB/118.8kB
 87e0a2d3c153 Extracting [====>                                              ]  33.42MB/354MB
 4aec5a4fac9f Extracting [==================================================>]  118.8kB/118.8kB
 4aec5a4fac9f Extracting [==================================================>]  118.8kB/118.8kB
 4aec5a4fac9f Pull complete 
 87e0a2d3c153 Extracting [====>                                              ]  33.98MB/354MB
 049742feb241 Extracting [>                                                  ]  557.1kB/84.94MB
 87e0a2d3c153 Extracting [=====>                                             ]  36.21MB/354MB
 049742feb241 Extracting [=>                                                 ]  2.228MB/84.94MB
 87e0a2d3c153 Extracting [======>                                            ]  43.45MB/354MB
 049742feb241 Extracting [==>                                                ]  3.899MB/84.94MB
 87e0a2d3c153 Extracting [======>                                            ]  47.35MB/354MB
 049742feb241 Extracting [===>                                               ]  5.571MB/84.94MB
 87e0a2d3c153 Extracting [=======>                                           ]  49.58MB/354MB
 049742feb241 Extracting [====>                                              ]  7.242MB/84.94MB
 87e0a2d3c153 Extracting [=======>                                           ]  54.59MB/354MB
 87e0a2d3c153 Extracting [========>                                          ]  57.38MB/354MB
 049742feb241 Extracting [=====>                                             ]  8.913MB/84.94MB
 87e0a2d3c153 Extracting [========>                                          ]  61.28MB/354MB
 049742feb241 Extracting [=====>                                             ]  10.03MB/84.94MB
 87e0a2d3c153 Extracting [========>                                          ]   63.5MB/354MB
 049742feb241 Extracting [======>                                            ]  11.14MB/84.94MB
 87e0a2d3c153 Extracting [=========>                                         ]  65.73MB/354MB
 049742feb241 Extracting [=======>                                           ]  12.81MB/84.94MB
 87e0a2d3c153 Extracting [=========>                                         ]  69.07MB/354MB
 87e0a2d3c153 Extracting [==========>                                        ]  74.09MB/354MB
 049742feb241 Extracting [========>                                          ]  15.04MB/84.94MB
 87e0a2d3c153 Extracting [===========>                                       ]  80.77MB/354MB
 049742feb241 Extracting [==========>                                        ]  17.27MB/84.94MB
 87e0a2d3c153 Extracting [============>                                      ]  88.57MB/354MB
 049742feb241 Extracting [===========>                                       ]  18.94MB/84.94MB
 87e0a2d3c153 Extracting [=============>                                     ]  93.03MB/354MB
 049742feb241 Extracting [===========>                                       ]  20.05MB/84.94MB
 87e0a2d3c153 Extracting [=============>                                     ]  98.04MB/354MB
 87e0a2d3c153 Extracting [==============>                                    ]  101.4MB/354MB
 049742feb241 Extracting [=============>                                     ]  22.28MB/84.94MB
 049742feb241 Extracting [==============>                                    ]  23.95MB/84.94MB
 87e0a2d3c153 Extracting [===============>                                   ]  106.4MB/354MB
 049742feb241 Extracting [===============>                                   ]  26.18MB/84.94MB
 87e0a2d3c153 Extracting [===============>                                   ]  113.1MB/354MB
 87e0a2d3c153 Extracting [================>                                  ]  120.3MB/354MB
 049742feb241 Extracting [=================>                                 ]  28.97MB/84.94MB
 87e0a2d3c153 Extracting [=================>                                 ]  126.5MB/354MB
 049742feb241 Extracting [==================>                                ]   31.2MB/84.94MB
 87e0a2d3c153 Extracting [==================>                                ]  128.7MB/354MB
 049742feb241 Extracting [==================>                                ]  31.75MB/84.94MB
 87e0a2d3c153 Extracting [===================>                               ]  134.8MB/354MB
 049742feb241 Extracting [====================>                              ]  34.54MB/84.94MB
 87e0a2d3c153 Extracting [====================>                              ]  143.2MB/354MB
 049742feb241 Extracting [======================>                            ]  37.88MB/84.94MB
 87e0a2d3c153 Extracting [====================>                              ]  147.6MB/354MB
 049742feb241 Extracting [======================>                            ]  38.99MB/84.94MB
 87e0a2d3c153 Extracting [====================>                              ]  148.2MB/354MB
 049742feb241 Extracting [=======================>                           ]  39.55MB/84.94MB
 87e0a2d3c153 Extracting [=====================>                             ]  151.5MB/354MB
 049742feb241 Extracting [========================>                          ]  41.22MB/84.94MB
 87e0a2d3c153 Extracting [======================>                            ]  156.5MB/354MB
 049742feb241 Extracting [=========================>                         ]  42.89MB/84.94MB
 87e0a2d3c153 Extracting [======================>                            ]  159.3MB/354MB
 049742feb241 Extracting [=========================>                         ]  44.01MB/84.94MB
 87e0a2d3c153 Extracting [======================>                            ]    161MB/354MB
 049742feb241 Extracting [==========================>                        ]  44.56MB/84.94MB
 87e0a2d3c153 Extracting [======================>                            ]  162.1MB/354MB
 049742feb241 Extracting [==========================>                        ]  45.68MB/84.94MB
 87e0a2d3c153 Extracting [=======================>                           ]  163.8MB/354MB
 049742feb241 Extracting [===========================>                       ]  47.35MB/84.94MB
 87e0a2d3c153 Extracting [=======================>                           ]    166MB/354MB
 049742feb241 Extracting [============================>                      ]  48.46MB/84.94MB
 87e0a2d3c153 Extracting [=======================>                           ]  168.2MB/354MB
 049742feb241 Extracting [=============================>                     ]  50.14MB/84.94MB
 049742feb241 Extracting [==============================>                    ]  51.25MB/84.94MB
 87e0a2d3c153 Extracting [========================>                          ]  170.5MB/354MB
 049742feb241 Extracting [==============================>                    ]  51.81MB/84.94MB
 87e0a2d3c153 Extracting [========================>                          ]  171.6MB/354MB
 049742feb241 Extracting [===============================>                   ]  52.92MB/84.94MB
 87e0a2d3c153 Extracting [========================>                          ]  173.2MB/354MB
 049742feb241 Extracting [===============================>                   ]  54.03MB/84.94MB
 87e0a2d3c153 Extracting [========================>                          ]  174.4MB/354MB
 049742feb241 Extracting [================================>                  ]  55.15MB/84.94MB
 87e0a2d3c153 Extracting [========================>                          ]  175.5MB/354MB
 87e0a2d3c153 Extracting [=========================>                         ]  177.1MB/354MB
 049742feb241 Extracting [=================================>                 ]  56.82MB/84.94MB
 87e0a2d3c153 Extracting [=========================>                         ]  178.3MB/354MB
 049742feb241 Extracting [==================================>                ]  58.49MB/84.94MB
 87e0a2d3c153 Extracting [=========================>                         ]  179.9MB/354MB
 049742feb241 Extracting [===================================>               ]   59.6MB/84.94MB
 87e0a2d3c153 Extracting [=========================>                         ]    181MB/354MB
 049742feb241 Extracting [===================================>               ]  60.72MB/84.94MB
 87e0a2d3c153 Extracting [=========================>                         ]  182.2MB/354MB
 049742feb241 Extracting [====================================>              ]  61.83MB/84.94MB
 87e0a2d3c153 Extracting [=========================>                         ]  183.8MB/354MB
 049742feb241 Extracting [=====================================>             ]  62.95MB/84.94MB
 87e0a2d3c153 Extracting [==========================>                        ]  184.9MB/354MB
 049742feb241 Extracting [======================================>            ]  64.62MB/84.94MB
 87e0a2d3c153 Extracting [==========================>                        ]  187.2MB/354MB
 049742feb241 Extracting [=======================================>           ]  66.29MB/84.94MB
 049742feb241 Extracting [========================================>          ]  69.63MB/84.94MB
 87e0a2d3c153 Extracting [==========================>                        ]    190MB/354MB
 049742feb241 Extracting [==========================================>        ]  72.42MB/84.94MB
 87e0a2d3c153 Extracting [===========================>                       ]  192.2MB/354MB
 049742feb241 Extracting [============================================>      ]   75.2MB/84.94MB
 87e0a2d3c153 Extracting [===========================>                       ]    195MB/354MB
 049742feb241 Extracting [=============================================>     ]  77.43MB/84.94MB
 87e0a2d3c153 Extracting [===========================>                       ]  197.8MB/354MB
 049742feb241 Extracting [===============================================>   ]  80.22MB/84.94MB
 87e0a2d3c153 Extracting [============================>                      ]  200.5MB/354MB
 049742feb241 Extracting [================================================>  ]  82.44MB/84.94MB
 87e0a2d3c153 Extracting [============================>                      ]  202.8MB/354MB
 049742feb241 Extracting [=================================================> ]  83.56MB/84.94MB
 87e0a2d3c153 Extracting [============================>                      ]    205MB/354MB
 049742feb241 Extracting [==================================================>]  84.94MB/84.94MB
 87e0a2d3c153 Extracting [=============================>                     ]  206.1MB/354MB
 049742feb241 Pull complete 
 87e0a2d3c153 Extracting [=============================>                     ]  207.2MB/354MB
 frontend Pulled 
 87e0a2d3c153 Extracting [=============================>                     ]    210MB/354MB
 87e0a2d3c153 Extracting [=============================>                     ]  211.1MB/354MB
 87e0a2d3c153 Extracting [==============================>                    ]  214.5MB/354MB
 87e0a2d3c153 Extracting [==============================>                    ]    215MB/354MB
 87e0a2d3c153 Extracting [==============================>                    ]  217.3MB/354MB
 87e0a2d3c153 Extracting [==============================>                    ]  218.9MB/354MB
 87e0a2d3c153 Extracting [===============================>                   ]  220.6MB/354MB
 87e0a2d3c153 Extracting [===============================>                   ]  222.8MB/354MB
 87e0a2d3c153 Extracting [===============================>                   ]  225.1MB/354MB
 87e0a2d3c153 Extracting [===============================>                   ]  226.2MB/354MB
 87e0a2d3c153 Extracting [================================>                  ]    229MB/354MB
 87e0a2d3c153 Extracting [================================>                  ]  231.7MB/354MB
 87e0a2d3c153 Extracting [=================================>                 ]  235.6MB/354MB
 87e0a2d3c153 Extracting [=================================>                 ]  237.3MB/354MB
 87e0a2d3c153 Extracting [=================================>                 ]  240.1MB/354MB
 87e0a2d3c153 Extracting [==================================>                ]    244MB/354MB
 87e0a2d3c153 Extracting [==================================>                ]  247.3MB/354MB
 87e0a2d3c153 Extracting [===================================>               ]  250.1MB/354MB
 87e0a2d3c153 Extracting [===================================>               ]  253.5MB/354MB
 87e0a2d3c153 Extracting [====================================>              ]  255.7MB/354MB
 87e0a2d3c153 Extracting [====================================>              ]  258.5MB/354MB
 87e0a2d3c153 Extracting [====================================>              ]  260.7MB/354MB
 87e0a2d3c153 Extracting [====================================>              ]  261.8MB/354MB
 87e0a2d3c153 Extracting [=====================================>             ]  262.4MB/354MB
 87e0a2d3c153 Extracting [=====================================>             ]  264.6MB/354MB
 87e0a2d3c153 Extracting [=====================================>             ]  266.3MB/354MB
 87e0a2d3c153 Extracting [=====================================>             ]  267.4MB/354MB
 87e0a2d3c153 Extracting [======================================>            ]  269.6MB/354MB
 87e0a2d3c153 Extracting [======================================>            ]  271.8MB/354MB
 87e0a2d3c153 Extracting [======================================>            ]  275.2MB/354MB
 87e0a2d3c153 Extracting [=======================================>           ]  279.1MB/354MB
 87e0a2d3c153 Extracting [=======================================>           ]    283MB/354MB
 87e0a2d3c153 Extracting [========================================>          ]  287.4MB/354MB
 87e0a2d3c153 Extracting [=========================================>         ]  292.5MB/354MB
 87e0a2d3c153 Extracting [=========================================>         ]  296.4MB/354MB
 87e0a2d3c153 Extracting [==========================================>        ]  299.7MB/354MB
 87e0a2d3c153 Extracting [===========================================>       ]  304.7MB/354MB
 87e0a2d3c153 Extracting [===========================================>       ]  307.5MB/354MB
 87e0a2d3c153 Extracting [===========================================>       ]  308.6MB/354MB
 87e0a2d3c153 Extracting [============================================>      ]  312.5MB/354MB
 87e0a2d3c153 Extracting [============================================>      ]  315.3MB/354MB
 87e0a2d3c153 Extracting [============================================>      ]  317.5MB/354MB
 87e0a2d3c153 Extracting [=============================================>     ]  319.8MB/354MB
 87e0a2d3c153 Extracting [=============================================>     ]    322MB/354MB
 87e0a2d3c153 Extracting [=============================================>     ]  323.6MB/354MB
 87e0a2d3c153 Extracting [=============================================>     ]  325.3MB/354MB
 87e0a2d3c153 Extracting [==============================================>    ]    327MB/354MB
 87e0a2d3c153 Extracting [==============================================>    ]  328.7MB/354MB
 87e0a2d3c153 Extracting [==============================================>    ]  330.3MB/354MB
 87e0a2d3c153 Extracting [==============================================>    ]  332.6MB/354MB
 87e0a2d3c153 Extracting [===============================================>   ]  334.8MB/354MB
 87e0a2d3c153 Extracting [===============================================>   ]  335.9MB/354MB
 87e0a2d3c153 Extracting [===============================================>   ]  337.6MB/354MB
 87e0a2d3c153 Extracting [===============================================>   ]  338.1MB/354MB
 87e0a2d3c153 Extracting [================================================>  ]  340.9MB/354MB
 87e0a2d3c153 Extracting [================================================>  ]  343.1MB/354MB
 87e0a2d3c153 Extracting [================================================>  ]  344.3MB/354MB
 87e0a2d3c153 Extracting [================================================>  ]  345.4MB/354MB
 87e0a2d3c153 Extracting [=================================================> ]  347.6MB/354MB
 87e0a2d3c153 Extracting [=================================================> ]  349.8MB/354MB
 87e0a2d3c153 Extracting [=================================================> ]  352.1MB/354MB
 87e0a2d3c153 Extracting [=================================================> ]  353.2MB/354MB
 87e0a2d3c153 Extracting [==================================================>]    354MB/354MB
 87e0a2d3c153 Pull complete 
 24f1f24f8e6b Extracting [===================>                               ]  32.77kB/82.43kB
 24f1f24f8e6b Extracting [==================================================>]  82.43kB/82.43kB
 24f1f24f8e6b Pull complete 
 21cd48f978f5 Extracting [==================================================>]  4.961kB/4.961kB
 21cd48f978f5 Extracting [==================================================>]  4.961kB/4.961kB
 21cd48f978f5 Pull complete 
 be6d2862a83a Extracting [==================================================>]     377B/377B
 be6d2862a83a Extracting [==================================================>]     377B/377B
 be6d2862a83a Pull complete 
 e4eddf6308cc Extracting [==================================================>]     151B/151B
 e4eddf6308cc Extracting [==================================================>]     151B/151B
 e4eddf6308cc Pull complete 
 205c3766881b Extracting [==================================================>]  2.131kB/2.131kB
 205c3766881b Extracting [==================================================>]  2.131kB/2.131kB
 205c3766881b Pull complete 
 297ac77fe774 Extracting [==================================================>]  2.121kB/2.121kB
 297ac77fe774 Extracting [==================================================>]  2.121kB/2.121kB
 297ac77fe774 Pull complete 
 backend Pulled 
🔄 Aplicando deploy...
 Container sistema_futebol_backend  Stopping
 Container sistema_futebol_backend  Stopped
 Container sistema_futebol_postgres  Running
 Container sistema_futebol_backend  Recreate
 Container sistema_futebol_backend  Recreated
 Container sistema_futebol_postgres  Waiting
 Container sistema_futebol_postgres  Healthy
 Container sistema_futebol_backend  Starting
 Container sistema_futebol_backend  Started
✅ Backend subiu normalmente
 Container sistema_futebol_postgres  Running
 Container sistema_futebol_frontend  Recreate
 Container sistema_futebol_frontend  Recreated
 Container sistema_futebol_postgres  Waiting
 Container sistema_futebol_postgres  Healthy
 Container sistema_futebol_backend  Starting
 Container sistema_futebol_backend  Started
 Container sistema_futebol_frontend  Starting
 Container sistema_futebol_frontend  Started
⏳ Aguardando containers iniciarem...
📊 Status dos containers:
NAME                       IMAGE                                                   COMMAND                  SERVICE    CREATED          STATUS                         PORTS
sistema_futebol_backend    ghcr.io/andresilvaaaa/sistema-futebol-backend:latest    "/app/docker-entrypo…"   backend    33 seconds ago   Restarting (2) 3 seconds ago   
sistema_futebol_frontend   ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest   "docker-entrypoint.s…"   frontend   32 seconds ago   Up 30 seconds (healthy)        0.0.0.0:8080->3000/tcp, [::]:8080->3000/tcp
sistema_futebol_postgres   postgres:15-alpine                                      "docker-entrypoint.s…"   postgres   2 hours ago      Up 2 hours (healthy)           0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp
🧪 Testando backend...
❌ Backend falhou! Logs:
sistema_futebol_backend  |   - FLASK_ENV: production
sistema_futebol_backend  |   - DB_HOST: postgres:5432
sistema_futebol_backend  |   - DB_NAME: sistema_futebol_prod
sistema_futebol_backend  |   - SKIP_MIGRATIONS: false
sistema_futebol_backend  |   - SKIP_SCHEMA_VALIDATION: false
sistema_futebol_backend  | 🚀 [ENTRYPOINT] Starting backend initialization...
sistema_futebol_backend  | 📊 [ENTRYPOINT] Configuration:
sistema_futebol_backend  |   - FLASK_APP: backend.app:app
sistema_futebol_backend  |   - FLASK_ENV: production
sistema_futebol_backend  |   - DB_HOST: postgres:5432
sistema_futebol_backend  |   - DB_NAME: sistema_futebol_prod
sistema_futebol_backend  |   - SKIP_MIGRATIONS: false
sistema_futebol_backend  |   - SKIP_SCHEMA_VALIDATION: false
sistema_futebol_backend  | /app/docker-entrypoint.sh: line 199: syntax error: unexpected end of file
sistema_futebol_backend  | 🚀 [ENTRYPOINT] Starting backend initialization...
sistema_futebol_backend  | 📊 [ENTRYPOINT] Configuration:
sistema_futebol_backend  |   - FLASK_APP: backend.app:app
sistema_futebol_backend  |   - FLASK_ENV: production
sistema_futebol_backend  |   - DB_HOST: postgres:5432
sistema_futebol_backend  |   - DB_NAME: sistema_futebol_prod
sistema_futebol_backend  |   - SKIP_MIGRATIONS: false
sistema_futebol_backend  |   - SKIP_SCHEMA_VALIDATION: false
sistema_futebol_backend  | /app/docker-entrypoint.sh: line 199: syntax error: unexpected end of file
sistema_futebol_backend  | 🚀 [ENTRYPOINT] Starting backend initialization...
sistema_futebol_backend  | 📊 [ENTRYPOINT] Configuration:
sistema_futebol_backend  |   - FLASK_APP: backend.app:app
sistema_futebol_backend  |   - FLASK_ENV: production
sistema_futebol_backend  |   - DB_HOST: postgres:5432
sistema_futebol_backend  |   - DB_NAME: sistema_futebol_prod
sistema_futebol_backend  |   - SKIP_MIGRATIONS: false
sistema_futebol_backend  |   - SKIP_SCHEMA_VALIDATION: false
sistema_futebol_backend  | /app/docker-entrypoint.sh: line 199: syntax error: unexpected end of file
sistema_futebol_backend  | /app/docker-entrypoint.sh: line 199: syntax error: unexpected end of file
sistema_futebol_backend  | 🚀 [ENTRYPOINT] Starting backend initialization...
sistema_futebol_backend  | 📊 [ENTRYPOINT] Configuration:
sistema_futebol_backend  |   - FLASK_APP: backend.app:app
sistema_futebol_backend  |   - FLASK_ENV: production
sistema_futebol_backend  |   - DB_HOST: postgres:5432
sistema_futebol_backend  |   - DB_NAME: sistema_futebol_prod
sistema_futebol_backend  |   - SKIP_MIGRATIONS: false
sistema_futebol_backend  |   - SKIP_SCHEMA_VALIDATION: false
sistema_futebol_backend  | 🚀 [ENTRYPOINT] Starting backend initialization...
sistema_futebol_backend  | 📊 [ENTRYPOINT] Configuration:
sistema_futebol_backend  |   - FLASK_APP: backend.app:app
sistema_futebol_backend  |   - FLASK_ENV: production
sistema_futebol_backend  |   - DB_HOST: postgres:5432
sistema_futebol_backend  |   - DB_NAME: sistema_futebol_prod
sistema_futebol_backend  |   - SKIP_MIGRATIONS: false
sistema_futebol_backend  |   - SKIP_SCHEMA_VALIDATION: false
sistema_futebol_backend  | /app/docker-entrypoint.sh: line 199: syntax error: unexpected end of file
2025/10/22 15:09:10 Process exited with status 1
Error: Process completed with exit code 1.