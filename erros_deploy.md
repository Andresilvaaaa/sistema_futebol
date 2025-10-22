Run appleboy/ssh-action@master
Run echo "$GITHUB_ACTION_PATH" >> $GITHUB_PATH
Run entrypoint.sh
Downloading drone-ssh-1.8.1-linux-amd64 from https://github.com/appleboy/drone-ssh/releases/download/v1.8.1
======= CLI Version Information =======
Drone SSH version 1.8.1
=======================================
🚀 Deploy iniciado em Wed Oct 22 15:21:03 UTC 2025
📦 Criando backup pré-deploy...
From https://github.com/Andresilvaaaa/sistema_futebol
   b85b190..2d01b9b  main       -> origin/main
HEAD is now at 2d01b9b Testando novas features - melhorias no deploy #4
📥 Baixando novas imagens...
 postgres Pulling 
 backend Pulling 
 frontend Pulling 
 38513bd72563 Already exists 
 a9ffe18d7fdb Already exists 
 e73850a50582 Already exists 
 19fb8589da02 Already exists 
 98bfa62308e6 Pulling fs layer 
 a6064f48db01 Pulling fs layer 
 a60f93fe97aa Pulling fs layer 
 9d8e95ff0d0d Pulling fs layer 
 cca11171e00f Pulling fs layer 
 b9168ca8e687 Pulling fs layer 
 914fbe986fe6 Pulling fs layer 
 d6859b26d183 Pulling fs layer 
 75535b9b80c2 Pulling fs layer 
 f2af27c68983 Pulling fs layer 
 9d8e95ff0d0d Waiting 
 cca11171e00f Waiting 
 b9168ca8e687 Waiting 
 914fbe986fe6 Waiting 
 d6859b26d183 Waiting 
 75535b9b80c2 Waiting 
 f2af27c68983 Waiting 
 2d35ebdb57d9 Already exists 
 60e45a9660cf Already exists 
 e74e4ed823e9 Already exists 
 da04d522c98f Already exists 
 75a804941502 Pulling fs layer 
 502d0d4d8731 Pulling fs layer 
 8565dc5628b4 Pulling fs layer 
 a1f0b23dd0b5 Pulling fs layer 
 053a66b503f4 Pulling fs layer 
 2e6705713ea5 Pulling fs layer 
 75a804941502 Waiting 
 502d0d4d8731 Waiting 
 8565dc5628b4 Waiting 
 a1f0b23dd0b5 Waiting 
 053a66b503f4 Waiting 
 2e6705713ea5 Waiting 
 postgres Pulled 
 a60f93fe97aa Downloading [==================================================>]  1.001kB/1.001kB
 a60f93fe97aa Verifying Checksum 
 a60f93fe97aa Download complete 
 98bfa62308e6 Downloading [==================================================>]      93B/93B
 98bfa62308e6 Verifying Checksum 
 98bfa62308e6 Download complete 
 98bfa62308e6 Extracting [==================================================>]      93B/93B
 98bfa62308e6 Extracting [==================================================>]      93B/93B
 98bfa62308e6 Pull complete 
 cca11171e00f Downloading [>                                                  ]  1.378kB/82.46kB
 cca11171e00f Downloading [==================================================>]  82.46kB/82.46kB
 cca11171e00f Verifying Checksum 
 cca11171e00f Download complete 
 9d8e95ff0d0d Downloading [>                                                  ]  539.5kB/354MB
 9d8e95ff0d0d Downloading [>                                                  ]  3.783MB/354MB
 9d8e95ff0d0d Downloading [=>                                                 ]  8.094MB/354MB
 a6064f48db01 Downloading [>                                                  ]  539.5kB/198.8MB
 b9168ca8e687 Downloading [=============>                                     ]  1.378kB/4.96kB
 b9168ca8e687 Downloading [==================================================>]   4.96kB/4.96kB
 b9168ca8e687 Verifying Checksum 
 b9168ca8e687 Download complete 
 9d8e95ff0d0d Downloading [=>                                                 ]  12.39MB/354MB
 a6064f48db01 Downloading [=>                                                 ]  4.309MB/198.8MB
 9d8e95ff0d0d Downloading [==>                                                ]  16.67MB/354MB
 a6064f48db01 Downloading [==>                                                ]  8.634MB/198.8MB
 9d8e95ff0d0d Downloading [==>                                                ]  20.96MB/354MB
 914fbe986fe6 Downloading [==================================================>]     377B/377B
 914fbe986fe6 Verifying Checksum 
 914fbe986fe6 Download complete 
 a6064f48db01 Downloading [===>                                               ]  12.95MB/198.8MB
 9d8e95ff0d0d Downloading [===>                                               ]  25.23MB/354MB
 a6064f48db01 Downloading [====>                                              ]  17.23MB/198.8MB
 9d8e95ff0d0d Downloading [====>                                              ]  28.97MB/354MB
 a6064f48db01 Downloading [=====>                                             ]   21.5MB/198.8MB
 9d8e95ff0d0d Downloading [====>                                              ]  33.26MB/354MB
 d6859b26d183 Downloading [==================================================>]     149B/149B
 d6859b26d183 Verifying Checksum 
 d6859b26d183 Download complete 
 a6064f48db01 Downloading [======>                                            ]  25.25MB/198.8MB
 9d8e95ff0d0d Downloading [=====>                                             ]  37.54MB/354MB
 9d8e95ff0d0d Downloading [=====>                                             ]   41.8MB/354MB
 a6064f48db01 Downloading [=======>                                           ]  29.51MB/198.8MB
 75535b9b80c2 Downloading [===============================>                   ]  1.378kB/2.157kB
 75535b9b80c2 Downloading [==================================================>]  2.157kB/2.157kB
 75535b9b80c2 Verifying Checksum 
 75535b9b80c2 Download complete 
 9d8e95ff0d0d Downloading [======>                                            ]  46.08MB/354MB
 a6064f48db01 Downloading [========>                                          ]   33.8MB/198.8MB
 9d8e95ff0d0d Downloading [=======>                                           ]  50.33MB/354MB
 a6064f48db01 Downloading [=========>                                         ]  38.09MB/198.8MB
 9d8e95ff0d0d Downloading [=======>                                           ]  54.62MB/354MB
 a6064f48db01 Downloading [==========>                                        ]  42.38MB/198.8MB
 f2af27c68983 Downloading [================================>                  ]  1.378kB/2.149kB
 f2af27c68983 Downloading [==================================================>]  2.149kB/2.149kB
 f2af27c68983 Verifying Checksum 
 f2af27c68983 Download complete 
 9d8e95ff0d0d Downloading [========>                                          ]  58.91MB/354MB
 a6064f48db01 Downloading [===========>                                       ]  46.13MB/198.8MB
 9d8e95ff0d0d Downloading [========>                                          ]  62.67MB/354MB
 a6064f48db01 Downloading [============>                                      ]  50.42MB/198.8MB
 9d8e95ff0d0d Downloading [=========>                                         ]  66.96MB/354MB
 a6064f48db01 Downloading [=============>                                     ]  54.68MB/198.8MB
 9d8e95ff0d0d Downloading [==========>                                        ]  71.23MB/354MB
 75a804941502 Downloading [==================================================>]      93B/93B
 75a804941502 Verifying Checksum 
 75a804941502 Download complete 
 75a804941502 Extracting [==================================================>]      93B/93B
 75a804941502 Extracting [==================================================>]      93B/93B
 75a804941502 Pull complete 
 9d8e95ff0d0d Downloading [==========>                                        ]  75.51MB/354MB
 a6064f48db01 Downloading [==============>                                    ]  58.96MB/198.8MB
 a6064f48db01 Downloading [===============>                                   ]  61.63MB/198.8MB
 9d8e95ff0d0d Downloading [===========>                                       ]  79.78MB/354MB
 9d8e95ff0d0d Downloading [===========>                                       ]  84.08MB/354MB
 a6064f48db01 Downloading [================>                                  ]  67.51MB/198.8MB
 9d8e95ff0d0d Downloading [============>                                      ]  88.37MB/354MB
 a6064f48db01 Downloading [=================>                                 ]  71.26MB/198.8MB
 9d8e95ff0d0d Downloading [=============>                                     ]  92.67MB/354MB
 a6064f48db01 Downloading [==================>                                ]  75.54MB/198.8MB
 9d8e95ff0d0d Downloading [=============>                                     ]  96.92MB/354MB
 a6064f48db01 Downloading [====================>                              ]  79.83MB/198.8MB
 9d8e95ff0d0d Downloading [==============>                                    ]  100.7MB/354MB
 502d0d4d8731 Downloading [>                                                  ]  43.79kB/4.327MB
 9d8e95ff0d0d Downloading [==============>                                    ]  104.9MB/354MB
 a6064f48db01 Downloading [=====================>                             ]  84.12MB/198.8MB
 502d0d4d8731 Downloading [========================>                          ]  2.107MB/4.327MB
 502d0d4d8731 Verifying Checksum 
 502d0d4d8731 Download complete 
 502d0d4d8731 Extracting [>                                                  ]  65.54kB/4.327MB
 a6064f48db01 Downloading [======================>                            ]  88.39MB/198.8MB
 9d8e95ff0d0d Downloading [===============>                                   ]  109.2MB/354MB
 502d0d4d8731 Extracting [===>                                               ]  262.1kB/4.327MB
 a6064f48db01 Downloading [======================>                            ]  91.08MB/198.8MB
 9d8e95ff0d0d Downloading [================>                                  ]  115.1MB/354MB
 502d0d4d8731 Extracting [====>                                              ]  393.2kB/4.327MB
 9d8e95ff0d0d Downloading [================>                                  ]  118.3MB/354MB
 a6064f48db01 Downloading [========================>                          ]  96.44MB/198.8MB
 502d0d4d8731 Extracting [=========>                                         ]    852kB/4.327MB
 a6064f48db01 Downloading [=========================>                         ]  100.2MB/198.8MB
 9d8e95ff0d0d Downloading [=================>                                 ]  122.6MB/354MB
 502d0d4d8731 Extracting [===============>                                   ]  1.376MB/4.327MB
 8565dc5628b4 Downloading [=>                                                 ]  1.378kB/61.27kB
 8565dc5628b4 Downloading [==================================================>]  61.27kB/61.27kB
 8565dc5628b4 Verifying Checksum 
 8565dc5628b4 Download complete 
 9d8e95ff0d0d Downloading [=================>                                 ]  126.4MB/354MB
 a6064f48db01 Downloading [==========================>                        ]  104.5MB/198.8MB
 502d0d4d8731 Extracting [==================>                                ]  1.638MB/4.327MB
 9d8e95ff0d0d Downloading [==================>                                ]  130.1MB/354MB
 a6064f48db01 Downloading [==========================>                        ]  106.6MB/198.8MB
 502d0d4d8731 Extracting [=====================>                             ]  1.835MB/4.327MB
 9d8e95ff0d0d Downloading [===================>                               ]  134.9MB/354MB
 a6064f48db01 Downloading [============================>                      ]    112MB/198.8MB
 502d0d4d8731 Extracting [=============================>                     ]  2.556MB/4.327MB
 9d8e95ff0d0d Downloading [===================>                               ]  138.7MB/354MB
 502d0d4d8731 Extracting [==================================================>]  4.327MB/4.327MB
 a6064f48db01 Downloading [============================>                      ]  114.7MB/198.8MB
 502d0d4d8731 Pull complete 
 8565dc5628b4 Extracting [==========================>                        ]  32.77kB/61.27kB
 8565dc5628b4 Extracting [==================================================>]  61.27kB/61.27kB
 8565dc5628b4 Pull complete 
 9d8e95ff0d0d Downloading [====================>                              ]    143MB/354MB
 a6064f48db01 Downloading [=============================>                     ]    119MB/198.8MB
 a1f0b23dd0b5 Downloading [>                                                  ]  539.5kB/200.9MB
 9d8e95ff0d0d Downloading [====================>                              ]  147.3MB/354MB
 a6064f48db01 Downloading [==============================>                    ]  121.6MB/198.8MB
 a1f0b23dd0b5 Downloading [=>                                                 ]  4.324MB/200.9MB
 9d8e95ff0d0d Downloading [=====================>                             ]  151.5MB/354MB
 a6064f48db01 Downloading [===============================>                   ]  125.4MB/198.8MB
 a1f0b23dd0b5 Downloading [==>                                                ]  9.716MB/200.9MB
 9d8e95ff0d0d Downloading [======================>                            ]  155.8MB/354MB
 a1f0b23dd0b5 Downloading [===>                                               ]  14.56MB/200.9MB
 a6064f48db01 Downloading [================================>                  ]  129.7MB/198.8MB
 9d8e95ff0d0d Downloading [======================>                            ]  160.1MB/354MB
 a1f0b23dd0b5 Downloading [====>                                              ]  18.31MB/200.9MB
 a6064f48db01 Downloading [=================================>                 ]  133.9MB/198.8MB
 9d8e95ff0d0d Downloading [=======================>                           ]  164.4MB/354MB
 a1f0b23dd0b5 Downloading [=====>                                             ]  22.06MB/200.9MB
 a6064f48db01 Downloading [==================================>                ]  137.1MB/198.8MB
 9d8e95ff0d0d Downloading [=======================>                           ]  167.6MB/354MB
 a1f0b23dd0b5 Downloading [======>                                            ]  25.28MB/200.9MB
 a6064f48db01 Downloading [===================================>               ]  139.3MB/198.8MB
 9d8e95ff0d0d Downloading [========================>                          ]  173.5MB/354MB
 a1f0b23dd0b5 Downloading [=======>                                           ]  30.62MB/200.9MB
 a6064f48db01 Downloading [====================================>              ]  144.6MB/198.8MB
 9d8e95ff0d0d Downloading [=========================>                         ]  177.2MB/354MB
 a1f0b23dd0b5 Downloading [========>                                          ]  34.92MB/200.9MB
 a6064f48db01 Downloading [=====================================>             ]  147.8MB/198.8MB
 9d8e95ff0d0d Downloading [=========================>                         ]    182MB/354MB
 a1f0b23dd0b5 Downloading [=========>                                         ]  39.19MB/200.9MB
 a6064f48db01 Downloading [=====================================>             ]    151MB/198.8MB
 a1f0b23dd0b5 Downloading [==========>                                        ]  42.95MB/200.9MB
 9d8e95ff0d0d Downloading [==========================>                        ]  186.3MB/354MB
 a6064f48db01 Downloading [=======================================>           ]  155.3MB/198.8MB
 a1f0b23dd0b5 Downloading [===========>                                       ]  47.19MB/200.9MB
 9d8e95ff0d0d Downloading [==========================>                        ]  190.6MB/354MB
 a6064f48db01 Downloading [========================================>          ]  159.1MB/198.8MB
 a1f0b23dd0b5 Downloading [============>                                      ]  51.46MB/200.9MB
 9d8e95ff0d0d Downloading [===========================>                       ]  194.8MB/354MB
 a6064f48db01 Downloading [========================================>          ]  162.9MB/198.8MB
 a1f0b23dd0b5 Downloading [=============>                                     ]  55.76MB/200.9MB
 9d8e95ff0d0d Downloading [============================>                      ]  199.1MB/354MB
 a1f0b23dd0b5 Downloading [==============>                                    ]   59.5MB/200.9MB
 a6064f48db01 Downloading [==========================================>        ]  167.1MB/198.8MB
 9d8e95ff0d0d Downloading [============================>                      ]  203.4MB/354MB
 a1f0b23dd0b5 Downloading [===============>                                   ]  63.26MB/200.9MB
 a6064f48db01 Downloading [===========================================>       ]  171.4MB/198.8MB
 9d8e95ff0d0d Downloading [=============================>                     ]  207.7MB/354MB
 a1f0b23dd0b5 Downloading [================>                                  ]  66.97MB/200.9MB
 a6064f48db01 Downloading [============================================>      ]  175.1MB/198.8MB
 9d8e95ff0d0d Downloading [=============================>                     ]  211.9MB/354MB
 a1f0b23dd0b5 Downloading [=================>                                 ]   71.8MB/200.9MB
 9d8e95ff0d0d Downloading [==============================>                    ]  216.2MB/354MB
 a6064f48db01 Downloading [=============================================>     ]  179.4MB/198.8MB
 a1f0b23dd0b5 Downloading [==================>                                ]  75.56MB/200.9MB
 a6064f48db01 Downloading [=============================================>     ]  182.6MB/198.8MB
 9d8e95ff0d0d Downloading [===============================>                   ]  220.5MB/354MB
 a1f0b23dd0b5 Downloading [===================>                               ]  78.23MB/200.9MB
 a6064f48db01 Downloading [===============================================>   ]  186.9MB/198.8MB
 9d8e95ff0d0d Downloading [===============================>                   ]  225.9MB/354MB
 a1f0b23dd0b5 Downloading [====================>                              ]  83.58MB/200.9MB
 a6064f48db01 Downloading [================================================>  ]  191.2MB/198.8MB
 9d8e95ff0d0d Downloading [================================>                  ]  229.6MB/354MB
 a1f0b23dd0b5 Downloading [=====================>                             ]  87.88MB/200.9MB
 9d8e95ff0d0d Downloading [================================>                  ]  233.4MB/354MB
 a6064f48db01 Downloading [================================================>  ]  194.5MB/198.8MB
 a1f0b23dd0b5 Downloading [======================>                            ]  91.62MB/200.9MB
 9d8e95ff0d0d Downloading [=================================>                 ]  237.7MB/354MB
 a6064f48db01 Downloading [=================================================> ]  197.7MB/198.8MB
 a1f0b23dd0b5 Downloading [=======================>                           ]  95.91MB/200.9MB
 a6064f48db01 Verifying Checksum 
 a6064f48db01 Download complete 
 9d8e95ff0d0d Downloading [==================================>                ]  241.9MB/354MB
 a1f0b23dd0b5 Downloading [========================>                          ]  99.67MB/200.9MB
 a6064f48db01 Extracting [>                                                  ]  557.1kB/198.8MB
 9d8e95ff0d0d Downloading [==================================>                ]  246.7MB/354MB
 a1f0b23dd0b5 Downloading [==========================>                        ]  104.5MB/200.9MB
 a6064f48db01 Extracting [>                                                  ]  2.785MB/198.8MB
 9d8e95ff0d0d Downloading [===================================>               ]  250.5MB/354MB
 a1f0b23dd0b5 Downloading [===========================>                       ]  108.8MB/200.9MB
 053a66b503f4 Downloading [>                                                  ]  1.378kB/118.8kB
 a6064f48db01 Extracting [=>                                                 ]  5.014MB/198.8MB
 053a66b503f4 Downloading [==================================================>]  118.8kB/118.8kB
 053a66b503f4 Verifying Checksum 
 053a66b503f4 Download complete 
 9d8e95ff0d0d Downloading [===================================>               ]  254.8MB/354MB
 a1f0b23dd0b5 Downloading [============================>                      ]    113MB/200.9MB
 a6064f48db01 Extracting [=>                                                 ]  6.685MB/198.8MB
 9d8e95ff0d0d Downloading [====================================>              ]    259MB/354MB
 a1f0b23dd0b5 Downloading [=============================>                     ]  117.3MB/200.9MB
 a6064f48db01 Extracting [==>                                                ]  10.03MB/198.8MB
 9d8e95ff0d0d Downloading [=====================================>             ]  263.3MB/354MB
 a1f0b23dd0b5 Downloading [==============================>                    ]  121.1MB/200.9MB
 a6064f48db01 Extracting [===>                                               ]  12.26MB/198.8MB
 a1f0b23dd0b5 Downloading [===============================>                   ]  125.3MB/200.9MB
 9d8e95ff0d0d Downloading [=====================================>             ]  267.6MB/354MB
 2e6705713ea5 Downloading [>                                                  ]  539.5kB/84.93MB
 a6064f48db01 Extracting [===>                                               ]   15.6MB/198.8MB
 a1f0b23dd0b5 Downloading [================================>                  ]  129.6MB/200.9MB
 9d8e95ff0d0d Downloading [======================================>            ]  271.9MB/354MB
 2e6705713ea5 Downloading [==>                                                ]   4.85MB/84.93MB
 9d8e95ff0d0d Downloading [======================================>            ]  275.7MB/354MB
 a1f0b23dd0b5 Downloading [================================>                  ]  132.3MB/200.9MB
 2e6705713ea5 Downloading [===>                                               ]  6.472MB/84.93MB
 9d8e95ff0d0d Downloading [=======================================>           ]  278.9MB/354MB
 a6064f48db01 Extracting [====>                                              ]  17.83MB/198.8MB
 a1f0b23dd0b5 Downloading [==================================>                ]  138.2MB/200.9MB
 2e6705713ea5 Downloading [======>                                            ]  11.88MB/84.93MB
 9d8e95ff0d0d Downloading [========================================>          ]  284.2MB/354MB
 a1f0b23dd0b5 Downloading [===================================>               ]  141.9MB/200.9MB
 a6064f48db01 Extracting [=====>                                             ]  20.05MB/198.8MB
 2e6705713ea5 Downloading [=========>                                         ]  16.18MB/84.93MB
 9d8e95ff0d0d Downloading [========================================>          ]  287.5MB/354MB
 a1f0b23dd0b5 Downloading [====================================>              ]  145.7MB/200.9MB
 2e6705713ea5 Downloading [============>                                      ]  20.46MB/84.93MB
 a6064f48db01 Extracting [=====>                                             ]  20.61MB/198.8MB
 a1f0b23dd0b5 Downloading [=====================================>             ]  149.4MB/200.9MB
 9d8e95ff0d0d Downloading [=========================================>         ]  291.7MB/354MB
 2e6705713ea5 Downloading [==============>                                    ]  25.29MB/84.93MB
 a1f0b23dd0b5 Downloading [======================================>            ]  153.2MB/200.9MB
 9d8e95ff0d0d Downloading [=========================================>         ]  295.5MB/354MB
 2e6705713ea5 Downloading [=================>                                 ]  29.57MB/84.93MB
 9d8e95ff0d0d Downloading [==========================================>        ]  298.7MB/354MB
 a1f0b23dd0b5 Downloading [=======================================>           ]  156.9MB/200.9MB
 a6064f48db01 Extracting [=====>                                             ]  21.73MB/198.8MB
 2e6705713ea5 Downloading [===================>                               ]  33.84MB/84.93MB
 9d8e95ff0d0d Downloading [==========================================>        ]  301.4MB/354MB
 a1f0b23dd0b5 Downloading [========================================>          ]  162.3MB/200.9MB
 2e6705713ea5 Downloading [=====================>                             ]  37.04MB/84.93MB
 9d8e95ff0d0d Downloading [==========================================>        ]  303.5MB/354MB
 a1f0b23dd0b5 Downloading [========================================>          ]  164.4MB/200.9MB
 2e6705713ea5 Downloading [=========================>                         ]  42.92MB/84.93MB
 9d8e95ff0d0d Downloading [===========================================>       ]  310.5MB/354MB
 a1f0b23dd0b5 Downloading [==========================================>        ]  170.8MB/200.9MB
 a6064f48db01 Extracting [=====>                                             ]  22.28MB/198.8MB
 2e6705713ea5 Downloading [===========================>                       ]  47.21MB/84.93MB
 9d8e95ff0d0d Downloading [============================================>      ]  315.3MB/354MB
 a1f0b23dd0b5 Downloading [===========================================>       ]  174.6MB/200.9MB
 a6064f48db01 Extracting [=====>                                             ]  22.84MB/198.8MB
 2e6705713ea5 Downloading [==============================>                    ]  50.96MB/84.93MB
 9d8e95ff0d0d Downloading [=============================================>     ]  319.6MB/354MB
 a1f0b23dd0b5 Downloading [============================================>      ]  179.9MB/200.9MB
 2e6705713ea5 Downloading [================================>                  ]  55.26MB/84.93MB
 a6064f48db01 Extracting [=====>                                             ]   23.4MB/198.8MB
 9d8e95ff0d0d Downloading [=============================================>     ]  322.8MB/354MB
 a1f0b23dd0b5 Downloading [=============================================>     ]  183.1MB/200.9MB
 9d8e95ff0d0d Downloading [==============================================>    ]    326MB/354MB
 2e6705713ea5 Downloading [==================================>                ]  58.48MB/84.93MB
 9d8e95ff0d0d Downloading [==============================================>    ]  329.8MB/354MB
 2e6705713ea5 Downloading [===================================>               ]  60.63MB/84.93MB
 a1f0b23dd0b5 Downloading [==============================================>    ]  185.8MB/200.9MB
 9d8e95ff0d0d Downloading [===============================================>   ]  334.1MB/354MB
 a1f0b23dd0b5 Downloading [===============================================>   ]  190.6MB/200.9MB
 2e6705713ea5 Downloading [=====================================>             ]  63.31MB/84.93MB
 9d8e95ff0d0d Downloading [================================================>  ]  340.5MB/354MB
 a1f0b23dd0b5 Downloading [=================================================> ]  199.2MB/200.9MB
 2e6705713ea5 Downloading [==========================================>        ]  71.87MB/84.93MB
 a1f0b23dd0b5 Verifying Checksum 
 a1f0b23dd0b5 Download complete 
 9d8e95ff0d0d Downloading [=================================================> ]  348.5MB/354MB
 a6064f48db01 Extracting [======>                                            ]  23.95MB/198.8MB
 2e6705713ea5 Downloading [============================================>      ]  75.62MB/84.93MB
 9d8e95ff0d0d Downloading [=================================================> ]  351.7MB/354MB
 2e6705713ea5 Downloading [==============================================>    ]  79.37MB/84.93MB
 9d8e95ff0d0d Verifying Checksum 
 9d8e95ff0d0d Download complete 
 2e6705713ea5 Verifying Checksum 
 2e6705713ea5 Download complete 
 a6064f48db01 Extracting [======>                                            ]  24.51MB/198.8MB
 a1f0b23dd0b5 Extracting [>                                                  ]  557.1kB/200.9MB
 a6064f48db01 Extracting [======>                                            ]  25.07MB/198.8MB
 a1f0b23dd0b5 Extracting [>                                                  ]  1.114MB/200.9MB
 a6064f48db01 Extracting [======>                                            ]  25.62MB/198.8MB
 a1f0b23dd0b5 Extracting [>                                                  ]  2.228MB/200.9MB
 a6064f48db01 Extracting [======>                                            ]  26.18MB/198.8MB
 a1f0b23dd0b5 Extracting [=>                                                 ]  4.456MB/200.9MB
 a6064f48db01 Extracting [=======>                                           ]  29.52MB/198.8MB
 a1f0b23dd0b5 Extracting [=>                                                 ]  5.571MB/200.9MB
 a6064f48db01 Extracting [=======>                                           ]  30.64MB/198.8MB
 a6064f48db01 Extracting [=======>                                           ]   31.2MB/198.8MB
 a1f0b23dd0b5 Extracting [=>                                                 ]  6.685MB/200.9MB
 a6064f48db01 Extracting [=======>                                           ]  31.75MB/198.8MB
 a1f0b23dd0b5 Extracting [=>                                                 ]  7.799MB/200.9MB
 a6064f48db01 Extracting [========>                                          ]  32.87MB/198.8MB
 a1f0b23dd0b5 Extracting [==>                                                ]   9.47MB/200.9MB
 a6064f48db01 Extracting [========>                                          ]  35.09MB/198.8MB
 a1f0b23dd0b5 Extracting [==>                                                ]   11.7MB/200.9MB
 a6064f48db01 Extracting [=========>                                         ]  37.32MB/198.8MB
 a1f0b23dd0b5 Extracting [===>                                               ]  14.48MB/200.9MB
 a6064f48db01 Extracting [=========>                                         ]  39.55MB/198.8MB
 a1f0b23dd0b5 Extracting [====>                                              ]  17.83MB/200.9MB
 a6064f48db01 Extracting [==========>                                        ]  42.34MB/198.8MB
 a1f0b23dd0b5 Extracting [=====>                                             ]  20.61MB/200.9MB
 a6064f48db01 Extracting [===========>                                       ]  45.12MB/198.8MB
 a6064f48db01 Extracting [===========>                                       ]  46.79MB/198.8MB
 a1f0b23dd0b5 Extracting [=====>                                             ]  22.84MB/200.9MB
 a6064f48db01 Extracting [============>                                      ]  49.02MB/198.8MB
 a1f0b23dd0b5 Extracting [======>                                            ]  25.62MB/200.9MB
 a6064f48db01 Extracting [=============>                                     ]  51.81MB/198.8MB
 a1f0b23dd0b5 Extracting [=======>                                           ]  28.41MB/200.9MB
 a6064f48db01 Extracting [=============>                                     ]  54.59MB/198.8MB
 a1f0b23dd0b5 Extracting [=======>                                           ]   31.2MB/200.9MB
 a6064f48db01 Extracting [==============>                                    ]  56.26MB/198.8MB
 a1f0b23dd0b5 Extracting [========>                                          ]  32.87MB/200.9MB
 a6064f48db01 Extracting [==============>                                    ]  59.05MB/198.8MB
 a1f0b23dd0b5 Extracting [========>                                          ]  35.65MB/200.9MB
 a6064f48db01 Extracting [===============>                                   ]  60.72MB/198.8MB
 a1f0b23dd0b5 Extracting [=========>                                         ]  37.32MB/200.9MB
 a6064f48db01 Extracting [===============>                                   ]  61.28MB/198.8MB
 a1f0b23dd0b5 Extracting [=========>                                         ]  38.44MB/200.9MB
 a6064f48db01 Extracting [===============>                                   ]  62.95MB/198.8MB
 a1f0b23dd0b5 Extracting [==========>                                        ]  41.22MB/200.9MB
 a6064f48db01 Extracting [================>                                  ]  65.73MB/198.8MB
 a1f0b23dd0b5 Extracting [==========>                                        ]  42.89MB/200.9MB
 a6064f48db01 Extracting [=================>                                 ]  67.96MB/198.8MB
 a1f0b23dd0b5 Extracting [===========>                                       ]  44.56MB/200.9MB
 a6064f48db01 Extracting [=================>                                 ]  70.19MB/198.8MB
 a1f0b23dd0b5 Extracting [===========>                                       ]  45.12MB/200.9MB
 a6064f48db01 Extracting [=================>                                 ]   71.3MB/198.8MB
 a1f0b23dd0b5 Extracting [===========>                                       ]  46.24MB/200.9MB
 a6064f48db01 Extracting [==================>                                ]  72.42MB/198.8MB
 a1f0b23dd0b5 Extracting [===========>                                       ]  47.35MB/200.9MB
 a6064f48db01 Extracting [==================>                                ]  73.53MB/198.8MB
 a1f0b23dd0b5 Extracting [============>                                      ]  49.02MB/200.9MB
 a6064f48db01 Extracting [===================>                               ]  75.76MB/198.8MB
 a1f0b23dd0b5 Extracting [============>                                      ]  51.25MB/200.9MB
 a6064f48db01 Extracting [===================>                               ]  78.54MB/198.8MB
 a1f0b23dd0b5 Extracting [=============>                                     ]  54.03MB/200.9MB
 a6064f48db01 Extracting [====================>                              ]  81.33MB/198.8MB
 a1f0b23dd0b5 Extracting [==============>                                    ]  56.82MB/200.9MB
 a6064f48db01 Extracting [=====================>                             ]  84.12MB/198.8MB
 a1f0b23dd0b5 Extracting [==============>                                    ]  59.05MB/200.9MB
 a6064f48db01 Extracting [=====================>                             ]  85.23MB/198.8MB
 a1f0b23dd0b5 Extracting [===============>                                   ]  62.39MB/200.9MB
 a6064f48db01 Extracting [======================>                            ]  88.01MB/198.8MB
 a6064f48db01 Extracting [======================>                            ]  90.24MB/198.8MB
 a1f0b23dd0b5 Extracting [================>                                  ]  65.18MB/200.9MB
 a6064f48db01 Extracting [=======================>                           ]  93.03MB/198.8MB
 a1f0b23dd0b5 Extracting [=================>                                 ]  68.52MB/200.9MB
 a6064f48db01 Extracting [========================>                          ]  95.81MB/198.8MB
 a1f0b23dd0b5 Extracting [=================>                                 ]   71.3MB/200.9MB
 a6064f48db01 Extracting [========================>                          ]  98.04MB/198.8MB
 a1f0b23dd0b5 Extracting [==================>                                ]  73.53MB/200.9MB
 a6064f48db01 Extracting [=========================>                         ]  99.71MB/198.8MB
 a1f0b23dd0b5 Extracting [==================>                                ]   75.2MB/200.9MB
 a6064f48db01 Extracting [=========================>                         ]  101.9MB/198.8MB
 a1f0b23dd0b5 Extracting [===================>                               ]  77.43MB/200.9MB
 a6064f48db01 Extracting [==========================>                        ]  104.7MB/198.8MB
 a1f0b23dd0b5 Extracting [===================>                               ]  80.22MB/200.9MB
 a6064f48db01 Extracting [==========================>                        ]    107MB/198.8MB
 a1f0b23dd0b5 Extracting [====================>                              ]  82.44MB/200.9MB
 a6064f48db01 Extracting [===========================>                       ]  108.6MB/198.8MB
 a1f0b23dd0b5 Extracting [====================>                              ]  83.56MB/200.9MB
 a6064f48db01 Extracting [===========================>                       ]  109.7MB/198.8MB
 a1f0b23dd0b5 Extracting [=====================>                             ]  85.23MB/200.9MB
 a6064f48db01 Extracting [============================>                      ]    112MB/198.8MB
 a1f0b23dd0b5 Extracting [=====================>                             ]  87.46MB/200.9MB
 a6064f48db01 Extracting [============================>                      ]  113.6MB/198.8MB
 a1f0b23dd0b5 Extracting [======================>                            ]  88.57MB/200.9MB
 a1f0b23dd0b5 Extracting [======================>                            ]  90.24MB/200.9MB
 a6064f48db01 Extracting [============================>                      ]  115.3MB/198.8MB
 a1f0b23dd0b5 Extracting [======================>                            ]  91.91MB/200.9MB
 a6064f48db01 Extracting [=============================>                     ]    117MB/198.8MB
 a6064f48db01 Extracting [=============================>                     ]  118.1MB/198.8MB
 a1f0b23dd0b5 Extracting [=======================>                           ]  93.03MB/200.9MB
 a6064f48db01 Extracting [=============================>                     ]  118.7MB/198.8MB
 a1f0b23dd0b5 Extracting [=======================>                           ]  94.14MB/200.9MB
 a6064f48db01 Extracting [==============================>                    ]  120.3MB/198.8MB
 a1f0b23dd0b5 Extracting [=======================>                           ]  96.37MB/200.9MB
 a6064f48db01 Extracting [==============================>                    ]  123.1MB/198.8MB
 a1f0b23dd0b5 Extracting [========================>                          ]  99.16MB/200.9MB
 a6064f48db01 Extracting [===============================>                   ]  125.9MB/198.8MB
 a1f0b23dd0b5 Extracting [=========================>                         ]  101.4MB/200.9MB
 a6064f48db01 Extracting [================================>                  ]  128.1MB/198.8MB
 a1f0b23dd0b5 Extracting [=========================>                         ]  103.1MB/200.9MB
 a6064f48db01 Extracting [================================>                  ]  130.4MB/198.8MB
 a1f0b23dd0b5 Extracting [==========================>                        ]  106.4MB/200.9MB
 a6064f48db01 Extracting [=================================>                 ]  132.6MB/198.8MB
 a1f0b23dd0b5 Extracting [===========================>                       ]  109.2MB/200.9MB
 a6064f48db01 Extracting [==================================>                ]  135.4MB/198.8MB
 a1f0b23dd0b5 Extracting [===========================>                       ]    112MB/200.9MB
 a6064f48db01 Extracting [==================================>                ]  138.1MB/198.8MB
 a1f0b23dd0b5 Extracting [============================>                      ]  114.8MB/200.9MB
 a6064f48db01 Extracting [===================================>               ]  139.8MB/198.8MB
 a1f0b23dd0b5 Extracting [============================>                      ]  116.4MB/200.9MB
 a6064f48db01 Extracting [===================================>               ]  141.5MB/198.8MB
 a1f0b23dd0b5 Extracting [=============================>                     ]  117.5MB/200.9MB
 a1f0b23dd0b5 Extracting [=============================>                     ]  118.1MB/200.9MB
 a6064f48db01 Extracting [===================================>               ]  142.6MB/198.8MB
 a1f0b23dd0b5 Extracting [=============================>                     ]  118.7MB/200.9MB
 a6064f48db01 Extracting [===================================>               ]  143.2MB/198.8MB
 a1f0b23dd0b5 Extracting [=============================>                     ]  119.8MB/200.9MB
 a6064f48db01 Extracting [====================================>              ]  144.3MB/198.8MB
 a6064f48db01 Extracting [====================================>              ]  145.9MB/198.8MB
 a1f0b23dd0b5 Extracting [==============================>                    ]  121.4MB/200.9MB
 a1f0b23dd0b5 Extracting [==============================>                    ]    122MB/200.9MB
 a6064f48db01 Extracting [====================================>              ]  147.1MB/198.8MB
 a6064f48db01 Extracting [=====================================>             ]  149.8MB/198.8MB
 a1f0b23dd0b5 Extracting [===============================>                   ]  124.8MB/200.9MB
 a6064f48db01 Extracting [=====================================>             ]    151MB/198.8MB
 a1f0b23dd0b5 Extracting [===============================>                   ]  126.5MB/200.9MB
 a6064f48db01 Extracting [======================================>            ]  151.5MB/198.8MB
 a1f0b23dd0b5 Extracting [===============================>                   ]    127MB/200.9MB
 a6064f48db01 Extracting [======================================>            ]  152.1MB/198.8MB
 a1f0b23dd0b5 Extracting [===============================>                   ]  127.6MB/200.9MB
 a6064f48db01 Extracting [======================================>            ]  152.6MB/198.8MB
 a1f0b23dd0b5 Extracting [===============================>                   ]  128.1MB/200.9MB
 a6064f48db01 Extracting [======================================>            ]  153.2MB/198.8MB
 a1f0b23dd0b5 Extracting [================================>                  ]  128.7MB/200.9MB
 a6064f48db01 Extracting [======================================>            ]  153.7MB/198.8MB
 a1f0b23dd0b5 Extracting [================================>                  ]  129.2MB/200.9MB
 a6064f48db01 Extracting [======================================>            ]  154.3MB/198.8MB
 a1f0b23dd0b5 Extracting [================================>                  ]  129.8MB/200.9MB
 a6064f48db01 Extracting [======================================>            ]  154.9MB/198.8MB
 a1f0b23dd0b5 Extracting [================================>                  ]  130.4MB/200.9MB
 a6064f48db01 Extracting [=======================================>           ]    156MB/198.8MB
 a1f0b23dd0b5 Extracting [================================>                  ]  130.9MB/200.9MB
 a6064f48db01 Extracting [=======================================>           ]  156.5MB/198.8MB
 a1f0b23dd0b5 Extracting [================================>                  ]    132MB/200.9MB
 a1f0b23dd0b5 Extracting [================================>                  ]  132.6MB/200.9MB
 a6064f48db01 Extracting [=======================================>           ]  157.1MB/198.8MB
 a1f0b23dd0b5 Extracting [=================================>                 ]  133.1MB/200.9MB
 a6064f48db01 Extracting [=======================================>           ]  157.6MB/198.8MB
 a1f0b23dd0b5 Extracting [=================================>                 ]  133.7MB/200.9MB
 a6064f48db01 Extracting [=======================================>           ]  158.2MB/198.8MB
 a6064f48db01 Extracting [=======================================>           ]  158.8MB/198.8MB
 a6064f48db01 Extracting [========================================>          ]  159.3MB/198.8MB
 a6064f48db01 Extracting [========================================>          ]  159.9MB/198.8MB
 a1f0b23dd0b5 Extracting [=================================>                 ]  134.3MB/200.9MB
 a6064f48db01 Extracting [========================================>          ]  160.4MB/198.8MB
 a6064f48db01 Extracting [========================================>          ]    161MB/198.8MB
 a6064f48db01 Extracting [========================================>          ]  161.5MB/198.8MB
 a1f0b23dd0b5 Extracting [=================================>                 ]  134.8MB/200.9MB
 a6064f48db01 Extracting [========================================>          ]  162.1MB/198.8MB
 a6064f48db01 Extracting [=========================================>         ]  163.2MB/198.8MB
 a1f0b23dd0b5 Extracting [=================================>                 ]  136.5MB/200.9MB
 a1f0b23dd0b5 Extracting [==================================>                ]    137MB/200.9MB
 a6064f48db01 Extracting [=========================================>         ]  164.3MB/198.8MB
 a1f0b23dd0b5 Extracting [==================================>                ]  137.6MB/200.9MB
 a6064f48db01 Extracting [=========================================>         ]  165.4MB/198.8MB
 a1f0b23dd0b5 Extracting [==================================>                ]  138.7MB/200.9MB
 a6064f48db01 Extracting [==========================================>        ]  167.7MB/198.8MB
 a1f0b23dd0b5 Extracting [==================================>                ]  140.4MB/200.9MB
 a6064f48db01 Extracting [==========================================>        ]  169.9MB/198.8MB
 a1f0b23dd0b5 Extracting [===================================>               ]  142.6MB/200.9MB
 a6064f48db01 Extracting [===========================================>       ]  172.7MB/198.8MB
 a1f0b23dd0b5 Extracting [===================================>               ]  144.3MB/200.9MB
 a6064f48db01 Extracting [===========================================>       ]  174.4MB/198.8MB
 a1f0b23dd0b5 Extracting [====================================>              ]  145.9MB/200.9MB
 a1f0b23dd0b5 Extracting [====================================>              ]  146.5MB/200.9MB
 a6064f48db01 Extracting [============================================>      ]  175.5MB/198.8MB
 a1f0b23dd0b5 Extracting [====================================>              ]  147.1MB/200.9MB
 a6064f48db01 Extracting [============================================>      ]  176.6MB/198.8MB
 a1f0b23dd0b5 Extracting [=====================================>             ]  148.7MB/200.9MB
 a1f0b23dd0b5 Extracting [=====================================>             ]  149.3MB/200.9MB
 a6064f48db01 Extracting [============================================>      ]  177.7MB/198.8MB
 a1f0b23dd0b5 Extracting [=====================================>             ]  149.8MB/200.9MB
 a6064f48db01 Extracting [============================================>      ]  178.3MB/198.8MB
 a1f0b23dd0b5 Extracting [=====================================>             ]  150.4MB/200.9MB
 a6064f48db01 Extracting [============================================>      ]  178.8MB/198.8MB
 a1f0b23dd0b5 Extracting [=====================================>             ]    151MB/200.9MB
 a6064f48db01 Extracting [=============================================>     ]  179.4MB/198.8MB
 a1f0b23dd0b5 Extracting [=====================================>             ]  152.1MB/200.9MB
 a6064f48db01 Extracting [=============================================>     ]    181MB/198.8MB
 a1f0b23dd0b5 Extracting [======================================>            ]  153.7MB/200.9MB
 a6064f48db01 Extracting [=============================================>     ]  182.7MB/198.8MB
 a1f0b23dd0b5 Extracting [======================================>            ]  155.4MB/200.9MB
 a6064f48db01 Extracting [==============================================>    ]  184.4MB/198.8MB
 a1f0b23dd0b5 Extracting [=======================================>           ]  157.6MB/200.9MB
 a6064f48db01 Extracting [==============================================>    ]  186.6MB/198.8MB
 a6064f48db01 Extracting [===============================================>   ]  188.3MB/198.8MB
 a1f0b23dd0b5 Extracting [=======================================>           ]  159.9MB/200.9MB
 a6064f48db01 Extracting [===============================================>   ]    190MB/198.8MB
 a1f0b23dd0b5 Extracting [========================================>          ]  161.5MB/200.9MB
 a6064f48db01 Extracting [===============================================>   ]  190.5MB/198.8MB
 a6064f48db01 Extracting [================================================>  ]  192.7MB/198.8MB
 a1f0b23dd0b5 Extracting [========================================>          ]  163.2MB/200.9MB
 a6064f48db01 Extracting [================================================>  ]  194.4MB/198.8MB
 a1f0b23dd0b5 Extracting [========================================>          ]  164.3MB/200.9MB
 a6064f48db01 Extracting [=================================================> ]  195.5MB/198.8MB
 a6064f48db01 Extracting [=================================================> ]  197.2MB/198.8MB
 a1f0b23dd0b5 Extracting [=========================================>         ]    166MB/200.9MB
 a6064f48db01 Extracting [=================================================> ]  198.3MB/198.8MB
 a1f0b23dd0b5 Extracting [=========================================>         ]  166.6MB/200.9MB
 a6064f48db01 Extracting [==================================================>]  198.8MB/198.8MB
 a6064f48db01 Extracting [==================================================>]  198.8MB/198.8MB
 a1f0b23dd0b5 Extracting [=========================================>         ]  167.7MB/200.9MB
 a6064f48db01 Pull complete 
 a60f93fe97aa Extracting [==================================================>]  1.001kB/1.001kB
 a60f93fe97aa Extracting [==================================================>]  1.001kB/1.001kB
 a60f93fe97aa Pull complete 
 a1f0b23dd0b5 Extracting [==========================================>        ]  168.8MB/200.9MB
 9d8e95ff0d0d Extracting [>                                                  ]  557.1kB/354MB
 a1f0b23dd0b5 Extracting [==========================================>        ]  169.9MB/200.9MB
 9d8e95ff0d0d Extracting [>                                                  ]  5.014MB/354MB
 a1f0b23dd0b5 Extracting [==========================================>        ]  171.6MB/200.9MB
 9d8e95ff0d0d Extracting [=>                                                 ]  8.356MB/354MB
 a1f0b23dd0b5 Extracting [==========================================>        ]  172.7MB/200.9MB
 9d8e95ff0d0d Extracting [=>                                                 ]  10.58MB/354MB
 a1f0b23dd0b5 Extracting [===========================================>       ]  174.4MB/200.9MB
 9d8e95ff0d0d Extracting [==>                                                ]  15.04MB/354MB
 9d8e95ff0d0d Extracting [==>                                                ]  16.15MB/354MB
 a1f0b23dd0b5 Extracting [===========================================>       ]  175.5MB/200.9MB
 9d8e95ff0d0d Extracting [==>                                                ]  16.71MB/354MB
 9d8e95ff0d0d Extracting [==>                                                ]  17.27MB/354MB
 a1f0b23dd0b5 Extracting [===========================================>       ]    176MB/200.9MB
 a1f0b23dd0b5 Extracting [===========================================>       ]  176.6MB/200.9MB
 9d8e95ff0d0d Extracting [==>                                                ]  18.38MB/354MB
 9d8e95ff0d0d Extracting [==>                                                ]   19.5MB/354MB
 a1f0b23dd0b5 Extracting [============================================>      ]  177.1MB/200.9MB
 a1f0b23dd0b5 Extracting [============================================>      ]  177.7MB/200.9MB
 9d8e95ff0d0d Extracting [==>                                                ]  20.05MB/354MB
 a1f0b23dd0b5 Extracting [============================================>      ]  178.3MB/200.9MB
 9d8e95ff0d0d Extracting [==>                                                ]  21.17MB/354MB
 a1f0b23dd0b5 Extracting [============================================>      ]  178.8MB/200.9MB
 9d8e95ff0d0d Extracting [===>                                               ]  22.84MB/354MB
 9d8e95ff0d0d Extracting [===>                                               ]  23.95MB/354MB
 a1f0b23dd0b5 Extracting [============================================>      ]  179.9MB/200.9MB
 a1f0b23dd0b5 Extracting [============================================>      ]  180.5MB/200.9MB
 9d8e95ff0d0d Extracting [===>                                               ]  25.07MB/354MB
 9d8e95ff0d0d Extracting [===>                                               ]  25.62MB/354MB
 a1f0b23dd0b5 Extracting [=============================================>     ]    181MB/200.9MB
 9d8e95ff0d0d Extracting [===>                                               ]  26.74MB/354MB
 9d8e95ff0d0d Extracting [===>                                               ]   27.3MB/354MB
 a1f0b23dd0b5 Extracting [=============================================>     ]  181.6MB/200.9MB
 9d8e95ff0d0d Extracting [====>                                              ]  32.31MB/354MB
 a1f0b23dd0b5 Extracting [=============================================>     ]  183.3MB/200.9MB
 9d8e95ff0d0d Extracting [====>                                              ]  33.42MB/354MB
 a1f0b23dd0b5 Extracting [=============================================>     ]  183.8MB/200.9MB
 9d8e95ff0d0d Extracting [====>                                              ]  34.54MB/354MB
 9d8e95ff0d0d Extracting [=====>                                             ]  36.77MB/354MB
 a1f0b23dd0b5 Extracting [==============================================>    ]  184.9MB/200.9MB
 a1f0b23dd0b5 Extracting [==============================================>    ]  185.5MB/200.9MB
 9d8e95ff0d0d Extracting [=====>                                             ]  38.44MB/354MB
 a1f0b23dd0b5 Extracting [==============================================>    ]  186.1MB/200.9MB
 9d8e95ff0d0d Extracting [=====>                                             ]  40.11MB/354MB
 a1f0b23dd0b5 Extracting [==============================================>    ]  186.6MB/200.9MB
 9d8e95ff0d0d Extracting [=====>                                             ]  41.78MB/354MB
 a1f0b23dd0b5 Extracting [==============================================>    ]  188.3MB/200.9MB
 9d8e95ff0d0d Extracting [======>                                            ]  45.12MB/354MB
 a1f0b23dd0b5 Extracting [===============================================>   ]  189.4MB/200.9MB
 9d8e95ff0d0d Extracting [======>                                            ]  46.79MB/354MB
 a1f0b23dd0b5 Extracting [===============================================>   ]  191.1MB/200.9MB
 9d8e95ff0d0d Extracting [=======>                                           ]  50.14MB/354MB
 a1f0b23dd0b5 Extracting [===============================================>   ]  191.6MB/200.9MB
 9d8e95ff0d0d Extracting [=======>                                           ]  51.25MB/354MB
 a1f0b23dd0b5 Extracting [===============================================>   ]  192.7MB/200.9MB
 9d8e95ff0d0d Extracting [=======>                                           ]  52.92MB/354MB
 a1f0b23dd0b5 Extracting [================================================>  ]  193.3MB/200.9MB
 9d8e95ff0d0d Extracting [=======>                                           ]  54.03MB/354MB
 9d8e95ff0d0d Extracting [=======>                                           ]  55.15MB/354MB
 a1f0b23dd0b5 Extracting [================================================>  ]  194.4MB/200.9MB
 a1f0b23dd0b5 Extracting [================================================>  ]    195MB/200.9MB
 a1f0b23dd0b5 Extracting [================================================>  ]  195.5MB/200.9MB
 a1f0b23dd0b5 Extracting [================================================>  ]  196.1MB/200.9MB
 a1f0b23dd0b5 Extracting [================================================>  ]  196.6MB/200.9MB
 a1f0b23dd0b5 Extracting [=================================================> ]  197.2MB/200.9MB
 9d8e95ff0d0d Extracting [=======>                                           ]  55.71MB/354MB
 a1f0b23dd0b5 Extracting [=================================================> ]  197.8MB/200.9MB
 a1f0b23dd0b5 Extracting [=================================================> ]  198.3MB/200.9MB
 9d8e95ff0d0d Extracting [=======>                                           ]  56.26MB/354MB
 9d8e95ff0d0d Extracting [========>                                          ]  57.93MB/354MB
 a1f0b23dd0b5 Extracting [=================================================> ]    200MB/200.9MB
 a1f0b23dd0b5 Extracting [==================================================>]  200.9MB/200.9MB
 9d8e95ff0d0d Extracting [========>                                          ]  61.28MB/354MB
 9d8e95ff0d0d Extracting [========>                                          ]  62.95MB/354MB
 9d8e95ff0d0d Extracting [=========>                                         ]  64.06MB/354MB
 9d8e95ff0d0d Extracting [=========>                                         ]  65.18MB/354MB
 9d8e95ff0d0d Extracting [=========>                                         ]  65.73MB/354MB
 9d8e95ff0d0d Extracting [=========>                                         ]  66.29MB/354MB
 a1f0b23dd0b5 Pull complete 
 053a66b503f4 Extracting [=============>                                     ]  32.77kB/118.8kB
 053a66b503f4 Extracting [==================================================>]  118.8kB/118.8kB
 053a66b503f4 Extracting [==================================================>]  118.8kB/118.8kB
 053a66b503f4 Pull complete 
 9d8e95ff0d0d Extracting [=========>                                         ]  67.96MB/354MB
 2e6705713ea5 Extracting [>                                                  ]  557.1kB/84.93MB
 9d8e95ff0d0d Extracting [=========>                                         ]  70.75MB/354MB
 2e6705713ea5 Extracting [=>                                                 ]  2.785MB/84.93MB
 9d8e95ff0d0d Extracting [===========>                                       ]  78.54MB/354MB
 2e6705713ea5 Extracting [==>                                                ]  3.899MB/84.93MB
 9d8e95ff0d0d Extracting [===========>                                       ]  81.33MB/354MB
 2e6705713ea5 Extracting [===>                                               ]  5.571MB/84.93MB
 9d8e95ff0d0d Extracting [============>                                      ]  86.34MB/354MB
 9d8e95ff0d0d Extracting [=============>                                     ]  93.03MB/354MB
 2e6705713ea5 Extracting [====>                                              ]  7.799MB/84.93MB
 9d8e95ff0d0d Extracting [=============>                                     ]  96.37MB/354MB
 2e6705713ea5 Extracting [=====>                                             ]  8.913MB/84.93MB
 9d8e95ff0d0d Extracting [==============>                                    ]  100.8MB/354MB
 2e6705713ea5 Extracting [======>                                            ]  10.58MB/84.93MB
 9d8e95ff0d0d Extracting [==============>                                    ]  102.5MB/354MB
 2e6705713ea5 Extracting [=======>                                           ]  12.26MB/84.93MB
 9d8e95ff0d0d Extracting [===============>                                   ]    112MB/354MB
 2e6705713ea5 Extracting [========>                                          ]  14.48MB/84.93MB
 9d8e95ff0d0d Extracting [=================>                                 ]  120.9MB/354MB
 9d8e95ff0d0d Extracting [=================>                                 ]  124.8MB/354MB
 2e6705713ea5 Extracting [=========>                                         ]  16.15MB/84.93MB
 9d8e95ff0d0d Extracting [==================>                                ]  131.5MB/354MB
 2e6705713ea5 Extracting [==========>                                        ]  18.38MB/84.93MB
 9d8e95ff0d0d Extracting [===================>                               ]  135.9MB/354MB
 2e6705713ea5 Extracting [============>                                      ]  20.61MB/84.93MB
 9d8e95ff0d0d Extracting [===================>                               ]  141.5MB/354MB
 9d8e95ff0d0d Extracting [====================>                              ]  143.7MB/354MB
 2e6705713ea5 Extracting [=============>                                     ]  22.28MB/84.93MB
 9d8e95ff0d0d Extracting [====================>                              ]  144.8MB/354MB
 2e6705713ea5 Extracting [=============>                                     ]   23.4MB/84.93MB
 9d8e95ff0d0d Extracting [====================>                              ]  148.2MB/354MB
 2e6705713ea5 Extracting [==============>                                    ]  25.07MB/84.93MB
 9d8e95ff0d0d Extracting [=====================>                             ]  153.2MB/354MB
 2e6705713ea5 Extracting [================>                                  ]  27.85MB/84.93MB
 9d8e95ff0d0d Extracting [======================>                            ]  157.6MB/354MB
 2e6705713ea5 Extracting [=================>                                 ]  30.08MB/84.93MB
 9d8e95ff0d0d Extracting [======================>                            ]    161MB/354MB
 9d8e95ff0d0d Extracting [======================>                            ]  161.5MB/354MB
 2e6705713ea5 Extracting [==================>                                ]  31.75MB/84.93MB
 9d8e95ff0d0d Extracting [======================>                            ]  162.1MB/354MB
 2e6705713ea5 Extracting [===================>                               ]  32.31MB/84.93MB
 9d8e95ff0d0d Extracting [=======================>                           ]  163.2MB/354MB
 2e6705713ea5 Extracting [===================>                               ]  33.42MB/84.93MB
 9d8e95ff0d0d Extracting [=======================>                           ]  166.6MB/354MB
 2e6705713ea5 Extracting [=====================>                             ]  36.77MB/84.93MB
 2e6705713ea5 Extracting [======================>                            ]  38.99MB/84.93MB
 9d8e95ff0d0d Extracting [=======================>                           ]  169.3MB/354MB
 2e6705713ea5 Extracting [=======================>                           ]  40.11MB/84.93MB
 9d8e95ff0d0d Extracting [========================>                          ]    171MB/354MB
 9d8e95ff0d0d Extracting [========================>                          ]  172.7MB/354MB
 2e6705713ea5 Extracting [========================>                          ]  41.22MB/84.93MB
 2e6705713ea5 Extracting [========================>                          ]  42.34MB/84.93MB
 9d8e95ff0d0d Extracting [========================>                          ]  174.4MB/354MB
 2e6705713ea5 Extracting [=========================>                         ]  43.45MB/84.93MB
 9d8e95ff0d0d Extracting [========================>                          ]    176MB/354MB
 2e6705713ea5 Extracting [==========================>                        ]  44.56MB/84.93MB
 9d8e95ff0d0d Extracting [=========================>                         ]  177.1MB/354MB
 2e6705713ea5 Extracting [==========================>                        ]  45.68MB/84.93MB
 9d8e95ff0d0d Extracting [=========================>                         ]  178.8MB/354MB
 2e6705713ea5 Extracting [===========================>                       ]  47.35MB/84.93MB
 9d8e95ff0d0d Extracting [=========================>                         ]    181MB/354MB
 9d8e95ff0d0d Extracting [=========================>                         ]  182.2MB/354MB
 2e6705713ea5 Extracting [============================>                      ]  48.46MB/84.93MB
 2e6705713ea5 Extracting [=============================>                     ]  49.58MB/84.93MB
 9d8e95ff0d0d Extracting [=========================>                         ]  183.8MB/354MB
 2e6705713ea5 Extracting [==============================>                    ]  51.25MB/84.93MB
 9d8e95ff0d0d Extracting [==========================>                        ]  185.5MB/354MB
 9d8e95ff0d0d Extracting [==========================>                        ]  187.2MB/354MB
 2e6705713ea5 Extracting [===============================>                   ]  53.48MB/84.93MB
 9d8e95ff0d0d Extracting [==========================>                        ]    190MB/354MB
 2e6705713ea5 Extracting [=================================>                 ]  56.26MB/84.93MB
 9d8e95ff0d0d Extracting [===========================>                       ]  192.7MB/354MB
 2e6705713ea5 Extracting [===================================>               ]   59.6MB/84.93MB
 9d8e95ff0d0d Extracting [===========================>                       ]    195MB/354MB
 2e6705713ea5 Extracting [====================================>              ]  61.28MB/84.93MB
 9d8e95ff0d0d Extracting [===========================>                       ]  197.2MB/354MB
 2e6705713ea5 Extracting [=====================================>             ]  62.95MB/84.93MB
 9d8e95ff0d0d Extracting [============================>                      ]  198.9MB/354MB
 2e6705713ea5 Extracting [=====================================>             ]  64.06MB/84.93MB
 9d8e95ff0d0d Extracting [============================>                      ]    200MB/354MB
 2e6705713ea5 Extracting [======================================>            ]  65.18MB/84.93MB
 9d8e95ff0d0d Extracting [============================>                      ]  201.7MB/354MB
 2e6705713ea5 Extracting [=======================================>           ]  66.85MB/84.93MB
 9d8e95ff0d0d Extracting [============================>                      ]  203.3MB/354MB
 2e6705713ea5 Extracting [========================================>          ]  69.07MB/84.93MB
 9d8e95ff0d0d Extracting [=============================>                     ]  206.7MB/354MB
 2e6705713ea5 Extracting [==========================================>        ]  72.97MB/84.93MB
 9d8e95ff0d0d Extracting [=============================>                     ]  207.8MB/354MB
 2e6705713ea5 Extracting [===========================================>       ]  74.09MB/84.93MB
 9d8e95ff0d0d Extracting [=============================>                     ]  210.6MB/354MB
 2e6705713ea5 Extracting [============================================>      ]  76.32MB/84.93MB
 2e6705713ea5 Extracting [=============================================>     ]  77.99MB/84.93MB
 9d8e95ff0d0d Extracting [==============================>                    ]  212.8MB/354MB
 2e6705713ea5 Extracting [==============================================>    ]  79.66MB/84.93MB
 9d8e95ff0d0d Extracting [==============================>                    ]    215MB/354MB
 2e6705713ea5 Extracting [===============================================>   ]  80.77MB/84.93MB
 9d8e95ff0d0d Extracting [==============================>                    ]  216.1MB/354MB
 2e6705713ea5 Extracting [================================================>  ]  81.89MB/84.93MB
 9d8e95ff0d0d Extracting [==============================>                    ]  217.3MB/354MB
 2e6705713ea5 Extracting [================================================>  ]     83MB/84.93MB
 9d8e95ff0d0d Extracting [==============================>                    ]  218.4MB/354MB
 9d8e95ff0d0d Extracting [===============================>                   ]    220MB/354MB
 2e6705713ea5 Extracting [=================================================> ]  84.67MB/84.93MB
 2e6705713ea5 Extracting [==================================================>]  84.93MB/84.93MB
 9d8e95ff0d0d Extracting [===============================>                   ]  221.2MB/354MB
 2e6705713ea5 Pull complete 
 frontend Pulled 
 9d8e95ff0d0d Extracting [===============================>                   ]  222.8MB/354MB
 9d8e95ff0d0d Extracting [===============================>                   ]  225.1MB/354MB
 9d8e95ff0d0d Extracting [===============================>                   ]  225.6MB/354MB
 9d8e95ff0d0d Extracting [================================>                  ]    229MB/354MB
 9d8e95ff0d0d Extracting [================================>                  ]  231.7MB/354MB
 9d8e95ff0d0d Extracting [=================================>                 ]  235.6MB/354MB
 9d8e95ff0d0d Extracting [=================================>                 ]  237.9MB/354MB
 9d8e95ff0d0d Extracting [=================================>                 ]  240.6MB/354MB
 9d8e95ff0d0d Extracting [==================================>                ]  244.5MB/354MB
 9d8e95ff0d0d Extracting [===================================>               ]  248.4MB/354MB
 9d8e95ff0d0d Extracting [===================================>               ]  252.3MB/354MB
 9d8e95ff0d0d Extracting [===================================>               ]    254MB/354MB
 9d8e95ff0d0d Extracting [====================================>              ]  257.4MB/354MB
 9d8e95ff0d0d Extracting [====================================>              ]  259.6MB/354MB
 9d8e95ff0d0d Extracting [====================================>              ]  261.8MB/354MB
 9d8e95ff0d0d Extracting [=====================================>             ]  262.9MB/354MB
 9d8e95ff0d0d Extracting [=====================================>             ]    264MB/354MB
 9d8e95ff0d0d Extracting [=====================================>             ]  265.2MB/354MB
 9d8e95ff0d0d Extracting [=====================================>             ]  266.8MB/354MB
 9d8e95ff0d0d Extracting [======================================>            ]  269.6MB/354MB
 9d8e95ff0d0d Extracting [======================================>            ]  271.3MB/354MB
 9d8e95ff0d0d Extracting [======================================>            ]  273.5MB/354MB
 9d8e95ff0d0d Extracting [======================================>            ]  275.7MB/354MB
 9d8e95ff0d0d Extracting [=======================================>           ]  280.2MB/354MB
 9d8e95ff0d0d Extracting [=======================================>           ]  282.4MB/354MB
 9d8e95ff0d0d Extracting [========================================>          ]  286.3MB/354MB
 9d8e95ff0d0d Extracting [=========================================>         ]  290.8MB/354MB
 9d8e95ff0d0d Extracting [=========================================>         ]  294.7MB/354MB
 9d8e95ff0d0d Extracting [=========================================>         ]  296.4MB/354MB
 9d8e95ff0d0d Extracting [==========================================>        ]    298MB/354MB
 9d8e95ff0d0d Extracting [==========================================>        ]  300.3MB/354MB
 9d8e95ff0d0d Extracting [==========================================>        ]  302.5MB/354MB
 9d8e95ff0d0d Extracting [===========================================>       ]  306.4MB/354MB
 9d8e95ff0d0d Extracting [===========================================>       ]  308.1MB/354MB
 9d8e95ff0d0d Extracting [===========================================>       ]  310.8MB/354MB
 9d8e95ff0d0d Extracting [============================================>      ]  314.2MB/354MB
 9d8e95ff0d0d Extracting [============================================>      ]  317.5MB/354MB
 9d8e95ff0d0d Extracting [=============================================>     ]  319.8MB/354MB
 9d8e95ff0d0d Extracting [=============================================>     ]    322MB/354MB
 9d8e95ff0d0d Extracting [=============================================>     ]  323.1MB/354MB
 9d8e95ff0d0d Extracting [=============================================>     ]  324.8MB/354MB
 9d8e95ff0d0d Extracting [==============================================>    ]  326.4MB/354MB
 9d8e95ff0d0d Extracting [==============================================>    ]  328.1MB/354MB
 9d8e95ff0d0d Extracting [==============================================>    ]  329.8MB/354MB
 9d8e95ff0d0d Extracting [==============================================>    ]  330.9MB/354MB
 9d8e95ff0d0d Extracting [===============================================>   ]  334.2MB/354MB
 9d8e95ff0d0d Extracting [===============================================>   ]  334.8MB/354MB
 9d8e95ff0d0d Extracting [===============================================>   ]  336.5MB/354MB
 9d8e95ff0d0d Extracting [===============================================>   ]  337.6MB/354MB
 9d8e95ff0d0d Extracting [===============================================>   ]  338.1MB/354MB
 9d8e95ff0d0d Extracting [================================================>  ]  340.9MB/354MB
 9d8e95ff0d0d Extracting [================================================>  ]    342MB/354MB
 9d8e95ff0d0d Extracting [================================================>  ]  343.1MB/354MB
 9d8e95ff0d0d Extracting [================================================>  ]  344.3MB/354MB
 9d8e95ff0d0d Extracting [================================================>  ]  345.4MB/354MB
 9d8e95ff0d0d Extracting [=================================================> ]  347.6MB/354MB
 9d8e95ff0d0d Extracting [=================================================> ]  349.3MB/354MB
 9d8e95ff0d0d Extracting [=================================================> ]  350.9MB/354MB
 9d8e95ff0d0d Extracting [=================================================> ]  352.1MB/354MB
 9d8e95ff0d0d Extracting [=================================================> ]  353.2MB/354MB
 9d8e95ff0d0d Extracting [==================================================>]    354MB/354MB
 9d8e95ff0d0d Pull complete 
 cca11171e00f Extracting [===================>                               ]  32.77kB/82.46kB
 cca11171e00f Extracting [==================================================>]  82.46kB/82.46kB
 cca11171e00f Extracting [==================================================>]  82.46kB/82.46kB
 cca11171e00f Pull complete 
 b9168ca8e687 Extracting [==================================================>]   4.96kB/4.96kB
 b9168ca8e687 Extracting [==================================================>]   4.96kB/4.96kB
 b9168ca8e687 Pull complete 
 914fbe986fe6 Extracting [==================================================>]     377B/377B
 914fbe986fe6 Extracting [==================================================>]     377B/377B
 914fbe986fe6 Pull complete 
 d6859b26d183 Extracting [==================================================>]     149B/149B
 d6859b26d183 Extracting [==================================================>]     149B/149B
 d6859b26d183 Pull complete 
 75535b9b80c2 Extracting [==================================================>]  2.157kB/2.157kB
 75535b9b80c2 Extracting [==================================================>]  2.157kB/2.157kB
 75535b9b80c2 Pull complete 
 f2af27c68983 Extracting [==================================================>]  2.149kB/2.149kB
 f2af27c68983 Extracting [==================================================>]  2.149kB/2.149kB
 f2af27c68983 Pull complete 
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
 Container sistema_futebol_backend  Running
 Container sistema_futebol_frontend  Recreate
 Container sistema_futebol_frontend  Recreated
 Container sistema_futebol_postgres  Waiting
 Container sistema_futebol_postgres  Healthy
 Container sistema_futebol_frontend  Starting
 Container sistema_futebol_frontend  Started
⏳ Aguardando containers iniciarem...
📊 Status dos containers:
NAME                       IMAGE                                                   COMMAND                  SERVICE    CREATED          STATUS                         PORTS
sistema_futebol_backend    ghcr.io/andresilvaaaa/sistema-futebol-backend:latest    "/app/docker-entrypo…"   backend    34 seconds ago   Restarting (2) 3 seconds ago   
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
sistema_futebol_backend  | /app/docker-entrypoint.sh: line 142: syntax error near unexpected token `}'
sistema_futebol_backend  | 🚀 [ENTRYPOINT] Starting backend initialization...
sistema_futebol_backend  | 📊 [ENTRYPOINT] Configuration:
sistema_futebol_backend  |   - FLASK_APP: backend.app:app
sistema_futebol_backend  |   - FLASK_ENV: production
sistema_futebol_backend  |   - DB_HOST: postgres:5432
sistema_futebol_backend  |   - DB_NAME: sistema_futebol_prod
sistema_futebol_backend  |   - SKIP_MIGRATIONS: false
sistema_futebol_backend  |   - SKIP_SCHEMA_VALIDATION: false
sistema_futebol_backend  | /app/docker-entrypoint.sh: line 142: syntax error near unexpected token `}'
sistema_futebol_backend  | 🚀 [ENTRYPOINT] Starting backend initialization...
sistema_futebol_backend  | 📊 [ENTRYPOINT] Configuration:
sistema_futebol_backend  |   - FLASK_APP: backend.app:app
sistema_futebol_backend  |   - FLASK_ENV: production
sistema_futebol_backend  |   - DB_HOST: postgres:5432
sistema_futebol_backend  |   - DB_NAME: sistema_futebol_prod
sistema_futebol_backend  |   - SKIP_MIGRATIONS: false
sistema_futebol_backend  |   - SKIP_SCHEMA_VALIDATION: false
sistema_futebol_backend  | /app/docker-entrypoint.sh: line 142: syntax error near unexpected token `}'
sistema_futebol_backend  | /app/docker-entrypoint.sh: line 142: syntax error near unexpected token `}'
sistema_futebol_backend  | 🚀 [ENTRYPOINT] Starting backend initialization...
sistema_futebol_backend  | 📊 [ENTRYPOINT] Configuration:
sistema_futebol_backend  |   - FLASK_APP: backend.app:app
sistema_futebol_backend  |   - FLASK_ENV: production
2025/10/22 15:22:33 Process exited with status 1
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
sistema_futebol_backend  | /app/docker-entrypoint.sh: line 142: syntax error near unexpected token `}'
Error: Process completed with exit code 1.