Run appleboy/ssh-action@master
Run echo "$GITHUB_ACTION_PATH" >> $GITHUB_PATH
Run entrypoint.sh
Downloading drone-ssh-1.8.1-linux-amd64 from https://github.com/appleboy/drone-ssh/releases/download/v1.8.1
======= CLI Version Information =======
Drone SSH version 1.8.1
=======================================
🚀 Deploy iniciado em Mon Oct 20 13:26:13 UTC 2025
From https://github.com/Andresilvaaaa/sistema_futebol
   6062b21..deb1cc4  main       -> origin/main
HEAD is now at deb1cc4 subindo novo docker-compose-prod
 Container sistema_futebol_frontend_1  Stopping
 Container sistema_futebol_frontend_1  Stopped
 Container sistema_futebol_frontend_1  Removing
 Container sistema_futebol_frontend_1  Removed
 Container sistema_futebol_backend_1  Stopping
 Container sistema_futebol_backend_1  Stopped
 Container sistema_futebol_backend_1  Removing
 Container sistema_futebol_backend_1  Removed
 Network sistema_futebol_sistema-futebol  Removing
 Network sistema_futebol_sistema-futebol  Removed
 postgres Pulling 
 backend Pulling 
 frontend Pulling 
 2d35ebdb57d9 Already exists 
 c087321cece4 Already exists 
 f2fbe8556258 Already exists 
 c74c90aa7c87 Already exists 
 6e396e6f9720 Pulling fs layer 
 ad8963fa4385 Pulling fs layer 
 78cd04d64841 Pulling fs layer 
 fe4b54c62f54 Pulling fs layer 
 e7383e9e0535 Pulling fs layer 
 69c5e1ac6383 Pulling fs layer 
 fe4b54c62f54 Waiting 
 e7383e9e0535 Waiting 
 69c5e1ac6383 Waiting 
 8c7716127147 Already exists 
 c72c56726626 Already exists 
 76d93c681ade Already exists 
 80061c640d63 Already exists 
 f5816bc94de7 Pulling fs layer 
 061a1e719d12 Pulling fs layer 
 0c7ee8b59fc1 Pulling fs layer 
 95b4572be167 Pulling fs layer 
 817ab3828829 Pulling fs layer 
 3f2a33a1bf32 Pulling fs layer 
 599c6223c326 Pulling fs layer 
 f5816bc94de7 Waiting 
 061a1e719d12 Waiting 
 0c7ee8b59fc1 Waiting 
 95b4572be167 Waiting 
 817ab3828829 Waiting 
 3f2a33a1bf32 Waiting 
 599c6223c326 Waiting 
 6e396e6f9720 Downloading [==================================================>]      93B/93B
 6e396e6f9720 Verifying Checksum 
 6e396e6f9720 Download complete 
 6e396e6f9720 Extracting [==================================================>]      93B/93B
 6e396e6f9720 Extracting [==================================================>]      93B/93B
 6e396e6f9720 Pull complete 
 78cd04d64841 Downloading [=>                                                 ]  1.378kB/60.63kB
 78cd04d64841 Verifying Checksum 
 78cd04d64841 Download complete 
 ad8963fa4385 Downloading [>                                                  ]   44.1kB/4.328MB
 ad8963fa4385 Downloading [================================================>  ]  4.227MB/4.328MB
 ad8963fa4385 Verifying Checksum 
 ad8963fa4385 Download complete 
 ad8963fa4385 Extracting [>                                                  ]  65.54kB/4.328MB
 ad8963fa4385 Extracting [==>                                                ]  196.6kB/4.328MB
 ad8963fa4385 Extracting [===>                                               ]  327.7kB/4.328MB
 ad8963fa4385 Extracting [==========>                                        ]  917.5kB/4.328MB
 e7383e9e0535 Downloading [>                                                  ]  1.378kB/113.8kB
 e7383e9e0535 Verifying Checksum 
 e7383e9e0535 Download complete 
 ad8963fa4385 Extracting [================>                                  ]  1.442MB/4.328MB
 fe4b54c62f54 Downloading [>                                                  ]  539.5kB/199.9MB
 69c5e1ac6383 Downloading [>                                                  ]  539.5kB/84.49MB
 ad8963fa4385 Extracting [==================>                                ]  1.638MB/4.328MB
 69c5e1ac6383 Downloading [==>                                                ]   4.85MB/84.49MB
 fe4b54c62f54 Downloading [>                                                  ]  2.161MB/199.9MB
 69c5e1ac6383 Downloading [====>                                              ]  7.012MB/84.49MB
 ad8963fa4385 Extracting [=====================>                             ]  1.901MB/4.328MB
 fe4b54c62f54 Downloading [>                                                  ]  3.243MB/199.9MB
 69c5e1ac6383 Downloading [=======>                                           ]  12.42MB/84.49MB
 f5816bc94de7 Downloading [==================================================>]      93B/93B
 f5816bc94de7 Verifying Checksum 
 f5816bc94de7 Download complete 
 f5816bc94de7 Extracting [==================================================>]      93B/93B
 f5816bc94de7 Extracting [==================================================>]      93B/93B
 ad8963fa4385 Extracting [=====================================>             ]  3.277MB/4.328MB
 fe4b54c62f54 Downloading [=>                                                 ]   5.39MB/199.9MB
 69c5e1ac6383 Downloading [==========>                                        ]  17.23MB/84.49MB
 f5816bc94de7 Pull complete 
 ad8963fa4385 Extracting [=================================================> ]  4.325MB/4.328MB
 ad8963fa4385 Extracting [==================================================>]  4.328MB/4.328MB
 fe4b54c62f54 Downloading [=>                                                 ]  7.553MB/199.9MB
 69c5e1ac6383 Downloading [=============>                                     ]  22.06MB/84.49MB
 ad8963fa4385 Pull complete 
 78cd04d64841 Extracting [===========================>                       ]  32.77kB/60.63kB
 78cd04d64841 Extracting [==================================================>]  60.63kB/60.63kB
 78cd04d64841 Pull complete 
 fe4b54c62f54 Downloading [==>                                                ]  8.634MB/199.9MB
 69c5e1ac6383 Downloading [================>                                  ]  27.96MB/84.49MB
 69c5e1ac6383 Downloading [===================>                               ]  33.34MB/84.49MB
 fe4b54c62f54 Downloading [===>                                               ]  12.41MB/199.9MB
 69c5e1ac6383 Downloading [=====================>                             ]  36.54MB/84.49MB
 061a1e719d12 Downloading [>                                                  ]  539.5kB/195.8MB
 fe4b54c62f54 Downloading [====>                                              ]  17.27MB/199.9MB
 061a1e719d12 Downloading [=>                                                 ]  5.374MB/195.8MB
 69c5e1ac6383 Downloading [=======================>                           ]  39.76MB/84.49MB
 fe4b54c62f54 Downloading [=====>                                             ]  20.51MB/199.9MB
 061a1e719d12 Downloading [==>                                                ]  9.159MB/195.8MB
 69c5e1ac6383 Downloading [==========================>                        ]  44.06MB/84.49MB
 fe4b54c62f54 Downloading [=====>                                             ]  23.75MB/199.9MB
 061a1e719d12 Downloading [===>                                               ]  12.88MB/195.8MB
 69c5e1ac6383 Downloading [============================>                      ]   47.8MB/84.49MB
 fe4b54c62f54 Downloading [======>                                            ]  27.52MB/199.9MB
 69c5e1ac6383 Downloading [==============================>                    ]  51.56MB/84.49MB
 061a1e719d12 Downloading [====>                                              ]  17.17MB/195.8MB
 fe4b54c62f54 Downloading [=======>                                           ]  30.22MB/199.9MB
 69c5e1ac6383 Downloading [================================>                  ]  54.78MB/84.49MB
 061a1e719d12 Downloading [=====>                                             ]  21.45MB/195.8MB
 fe4b54c62f54 Downloading [========>                                          ]     34MB/199.9MB
 69c5e1ac6383 Downloading [==================================>                ]  59.04MB/84.49MB
 061a1e719d12 Downloading [======>                                            ]  25.74MB/195.8MB
 fe4b54c62f54 Downloading [=========>                                         ]  37.78MB/199.9MB
 69c5e1ac6383 Downloading [=====================================>             ]  63.33MB/84.49MB
 061a1e719d12 Downloading [=======>                                           ]  30.01MB/195.8MB
 fe4b54c62f54 Downloading [==========>                                        ]  41.54MB/199.9MB
 69c5e1ac6383 Downloading [=======================================>           ]  67.07MB/84.49MB
 061a1e719d12 Downloading [========>                                          ]   34.3MB/195.8MB
 fe4b54c62f54 Downloading [===========>                                       ]  45.32MB/199.9MB
 69c5e1ac6383 Downloading [==========================================>        ]  71.37MB/84.49MB
 061a1e719d12 Downloading [=========>                                         ]  38.57MB/195.8MB
 fe4b54c62f54 Downloading [============>                                      ]   49.1MB/199.9MB
 69c5e1ac6383 Downloading [============================================>      ]  75.65MB/84.49MB
 061a1e719d12 Downloading [==========>                                        ]  42.85MB/195.8MB
 fe4b54c62f54 Downloading [=============>                                     ]  52.88MB/199.9MB
 69c5e1ac6383 Downloading [===============================================>   ]  79.94MB/84.49MB
 061a1e719d12 Downloading [============>                                      ]  47.11MB/195.8MB
 fe4b54c62f54 Downloading [==============>                                    ]   57.2MB/199.9MB
 69c5e1ac6383 Downloading [=================================================> ]  84.23MB/84.49MB
 69c5e1ac6383 Verifying Checksum 
 69c5e1ac6383 Download complete 
 061a1e719d12 Downloading [=============>                                     ]  51.39MB/195.8MB
 fe4b54c62f54 Downloading [===============>                                   ]  62.59MB/199.9MB
 061a1e719d12 Downloading [==============>                                    ]  55.69MB/195.8MB
 fe4b54c62f54 Downloading [=================>                                 ]  68.53MB/199.9MB
 061a1e719d12 Downloading [===============>                                   ]  59.43MB/195.8MB
 fe4b54c62f54 Downloading [==================>                                ]  72.83MB/199.9MB
 061a1e719d12 Downloading [================>                                  ]  63.71MB/195.8MB
 fe4b54c62f54 Downloading [====================>                              ]  80.37MB/199.9MB
 0c7ee8b59fc1 Downloading [==================================================>]  1.001kB/1.001kB
 0c7ee8b59fc1 Verifying Checksum 
 0c7ee8b59fc1 Download complete 
 061a1e719d12 Downloading [=================>                                 ]  67.99MB/195.8MB
 fe4b54c62f54 Downloading [=====================>                             ]  85.76MB/199.9MB
 061a1e719d12 Downloading [==================>                                ]  72.27MB/195.8MB
 fe4b54c62f54 Downloading [=======================>                           ]  92.22MB/199.9MB
 061a1e719d12 Downloading [===================>                               ]  76.57MB/195.8MB
 fe4b54c62f54 Downloading [========================>                          ]  98.15MB/199.9MB
 061a1e719d12 Downloading [====================>                              ]  80.85MB/195.8MB
 fe4b54c62f54 Downloading [==========================>                        ]  105.7MB/199.9MB
 95b4572be167 Downloading [>                                                  ]  539.5kB/193MB
 061a1e719d12 Downloading [=====================>                             ]  85.13MB/195.8MB
 fe4b54c62f54 Downloading [============================>                      ]  112.7MB/199.9MB
 95b4572be167 Downloading [>                                                  ]  3.243MB/193MB
 061a1e719d12 Downloading [======================>                            ]  89.42MB/195.8MB
 fe4b54c62f54 Downloading [=============================>                     ]  118.1MB/199.9MB
 95b4572be167 Downloading [=>                                                 ]  7.016MB/193MB
 061a1e719d12 Downloading [=======================>                           ]   93.7MB/195.8MB
 fe4b54c62f54 Downloading [==============================>                    ]  122.5MB/199.9MB
 95b4572be167 Downloading [===>                                               ]  12.42MB/193MB
 061a1e719d12 Downloading [=========================>                         ]  97.97MB/195.8MB
 fe4b54c62f54 Downloading [===============================>                   ]  126.2MB/199.9MB
 95b4572be167 Downloading [====>                                              ]  17.23MB/193MB
 061a1e719d12 Downloading [==========================>                        ]  102.2MB/195.8MB
 95b4572be167 Downloading [=====>                                             ]  21.51MB/193MB
 061a1e719d12 Downloading [==========================>                        ]  104.9MB/195.8MB
 fe4b54c62f54 Downloading [================================>                  ]  131.1MB/199.9MB
 95b4572be167 Downloading [=====>                                             ]   23.1MB/193MB
 fe4b54c62f54 Downloading [=================================>                 ]  132.7MB/199.9MB
 061a1e719d12 Downloading [===========================>                       ]  107.1MB/195.8MB
 95b4572be167 Downloading [======>                                            ]  24.71MB/193MB
 fe4b54c62f54 Downloading [=================================>                 ]  134.3MB/199.9MB
 061a1e719d12 Downloading [============================>                      ]  110.3MB/195.8MB
 95b4572be167 Downloading [=======>                                           ]  27.92MB/193MB
 fe4b54c62f54 Downloading [==================================>                ]    138MB/199.9MB
 061a1e719d12 Downloading [=============================>                     ]  114.5MB/195.8MB
 95b4572be167 Downloading [========>                                          ]  31.68MB/193MB
 fe4b54c62f54 Downloading [====================================>              ]  144.5MB/199.9MB
 061a1e719d12 Downloading [=============================>                     ]  115.6MB/195.8MB
 95b4572be167 Downloading [========>                                          ]  33.82MB/193MB
 fe4b54c62f54 Downloading [=====================================>             ]  149.3MB/199.9MB
 061a1e719d12 Downloading [==============================>                    ]  118.8MB/195.8MB
 95b4572be167 Downloading [=========>                                         ]  35.43MB/193MB
 fe4b54c62f54 Downloading [=======================================>           ]  156.9MB/199.9MB
 061a1e719d12 Downloading [===============================>                   ]  123.6MB/195.8MB
 95b4572be167 Downloading [==========>                                        ]  41.31MB/193MB
 fe4b54c62f54 Downloading [========================================>          ]  160.6MB/199.9MB
 061a1e719d12 Downloading [=================================>                 ]  129.5MB/195.8MB
 95b4572be167 Downloading [===========>                                       ]  46.13MB/193MB
 fe4b54c62f54 Downloading [========================================>          ]  162.2MB/199.9MB
 061a1e719d12 Downloading [=================================>                 ]  130.6MB/195.8MB
 95b4572be167 Downloading [============>                                      ]   47.2MB/193MB
 fe4b54c62f54 Downloading [========================================>          ]  163.3MB/199.9MB
 061a1e719d12 Downloading [=================================>                 ]  131.6MB/195.8MB
 95b4572be167 Downloading [============>                                      ]  48.81MB/193MB
 fe4b54c62f54 Downloading [=========================================>         ]    166MB/199.9MB
 061a1e719d12 Downloading [==================================>                ]  134.3MB/195.8MB
 95b4572be167 Downloading [=============>                                     ]   51.5MB/193MB
 fe4b54c62f54 Downloading [=========================================>         ]    167MB/199.9MB
 061a1e719d12 Downloading [====================================>              ]  141.3MB/195.8MB
 95b4572be167 Downloading [==============>                                    ]  54.68MB/193MB
 061a1e719d12 Downloading [====================================>              ]  142.3MB/195.8MB
 fe4b54c62f54 Downloading [==========================================>        ]  168.6MB/199.9MB
 95b4572be167 Downloading [==============>                                    ]  57.36MB/193MB
 fe4b54c62f54 Downloading [==========================================>        ]  170.2MB/199.9MB
 061a1e719d12 Downloading [=====================================>             ]  145.6MB/195.8MB
 fe4b54c62f54 Downloading [==========================================>        ]  171.3MB/199.9MB
 061a1e719d12 Downloading [======================================>            ]  151.4MB/195.8MB
 95b4572be167 Downloading [===============>                                   ]  58.97MB/193MB
 fe4b54c62f54 Downloading [===========================================>       ]  172.9MB/199.9MB
 95b4572be167 Downloading [===============>                                   ]  61.67MB/193MB
 061a1e719d12 Downloading [======================================>            ]  152.5MB/195.8MB
 95b4572be167 Downloading [================>                                  ]  62.74MB/193MB
 fe4b54c62f54 Downloading [===========================================>       ]    174MB/199.9MB
 061a1e719d12 Downloading [=======================================>           ]    153MB/195.8MB
 95b4572be167 Downloading [================>                                  ]  64.35MB/193MB
 fe4b54c62f54 Downloading [===========================================>       ]  175.1MB/199.9MB
 061a1e719d12 Downloading [=========================================>         ]  162.1MB/195.8MB
 95b4572be167 Downloading [==================>                                ]   70.8MB/193MB
 fe4b54c62f54 Downloading [============================================>      ]  177.2MB/199.9MB
 061a1e719d12 Downloading [==========================================>        ]  165.3MB/195.8MB
 95b4572be167 Downloading [===================>                               ]  74.54MB/193MB
 fe4b54c62f54 Downloading [============================================>      ]  179.4MB/199.9MB
 061a1e719d12 Downloading [==========================================>        ]  166.4MB/195.8MB
 95b4572be167 Downloading [====================>                              ]  77.23MB/193MB
 fe4b54c62f54 Downloading [===============================================>   ]  188.5MB/199.9MB
 061a1e719d12 Downloading [===========================================>       ]  169.1MB/195.8MB
 95b4572be167 Downloading [====================>                              ]   78.3MB/193MB
 fe4b54c62f54 Downloading [===============================================>   ]  189.6MB/199.9MB
 061a1e719d12 Downloading [===========================================>       ]  170.1MB/195.8MB
 95b4572be167 Downloading [====================>                              ]  79.37MB/193MB
 fe4b54c62f54 Downloading [===============================================>   ]  190.7MB/199.9MB
 061a1e719d12 Downloading [===========================================>       ]  171.2MB/195.8MB
 95b4572be167 Downloading [====================>                              ]  80.45MB/193MB
 fe4b54c62f54 Downloading [================================================>  ]  192.3MB/199.9MB
 061a1e719d12 Downloading [============================================>      ]    175MB/195.8MB
 fe4b54c62f54 Downloading [=================================================> ]  196.5MB/199.9MB
 95b4572be167 Downloading [=====================>                             ]  84.18MB/193MB
 061a1e719d12 Downloading [==============================================>    ]  181.9MB/195.8MB
 fe4b54c62f54 Verifying Checksum 
 fe4b54c62f54 Download complete 
 95b4572be167 Downloading [======================>                            ]  88.47MB/193MB
 061a1e719d12 Downloading [===============================================>   ]  184.6MB/195.8MB
 95b4572be167 Downloading [=======================>                           ]  90.62MB/193MB
 061a1e719d12 Downloading [===============================================>   ]  185.7MB/195.8MB
 95b4572be167 Downloading [=======================>                           ]  91.16MB/193MB
 817ab3828829 Downloading [>                                                  ]  1.378kB/73.75kB
 817ab3828829 Downloading [==================================================>]  73.75kB/73.75kB
 817ab3828829 Verifying Checksum 
 817ab3828829 Download complete 
 95b4572be167 Downloading [=======================>                           ]  92.24MB/193MB
 061a1e719d12 Downloading [===============================================>   ]  186.7MB/195.8MB
 fe4b54c62f54 Extracting [>                                                  ]  557.1kB/199.9MB
 95b4572be167 Downloading [=========================>                         ]  97.07MB/193MB
 061a1e719d12 Downloading [================================================>  ]  188.9MB/195.8MB
 95b4572be167 Downloading [=========================>                         ]  99.22MB/193MB
 061a1e719d12 Downloading [================================================>  ]  190.5MB/195.8MB
 2d35ebdb57d9 Already exists 
 cad436dd248c Pulling fs layer 
 2ea3ebf7d306 Pulling fs layer 
 84a991b0a3f7 Pulling fs layer 
 3945a9548b2f Pulling fs layer 
 a623f40cda43 Pulling fs layer 
 c60bbb65edfc Pulling fs layer 
 76774548c03c Pulling fs layer 
 b1b6b375f3c3 Pulling fs layer 
 6cd0b72d8da2 Pulling fs layer 
 6986ebe18735 Pulling fs layer 
 cad436dd248c Waiting 
 2ea3ebf7d306 Waiting 
 84a991b0a3f7 Waiting 
 3945a9548b2f Waiting 
 a623f40cda43 Waiting 
 c60bbb65edfc Waiting 
 76774548c03c Waiting 
 b1b6b375f3c3 Waiting 
 6cd0b72d8da2 Waiting 
 6986ebe18735 Waiting 
 3f2a33a1bf32 Downloading [==================================================>]     377B/377B
 3f2a33a1bf32 Verifying Checksum 
 3f2a33a1bf32 Download complete 
 95b4572be167 Downloading [===========================>                       ]  105.1MB/193MB
 061a1e719d12 Downloading [=================================================> ]  193.1MB/195.8MB
 95b4572be167 Downloading [===========================>                       ]  106.2MB/193MB
 061a1e719d12 Downloading [=================================================> ]  194.2MB/195.8MB
 95b4572be167 Downloading [===========================>                       ]  107.3MB/193MB
 061a1e719d12 Downloading [=================================================> ]  195.3MB/195.8MB
 599c6223c326 Downloading [==================================================>]     149B/149B
 061a1e719d12 Verifying Checksum 
 061a1e719d12 Download complete 
 599c6223c326 Verifying Checksum 
 599c6223c326 Download complete 
 95b4572be167 Downloading [============================>                      ]  108.9MB/193MB
 95b4572be167 Downloading [=============================>                     ]  112.1MB/193MB
 061a1e719d12 Extracting [>                                                  ]  557.1kB/195.8MB
 95b4572be167 Downloading [==============================>                    ]  116.4MB/193MB
 95b4572be167 Downloading [==============================>                    ]  119.1MB/193MB
 fe4b54c62f54 Extracting [>                                                  ]  1.114MB/199.9MB
 061a1e719d12 Extracting [>                                                  ]  1.114MB/195.8MB
 95b4572be167 Downloading [===============================>                   ]  120.7MB/193MB
 cad436dd248c Downloading [=================================================> ]     954B/969B
 cad436dd248c Downloading [==================================================>]     969B/969B
 cad436dd248c Verifying Checksum 
 cad436dd248c Download complete 
 cad436dd248c Extracting [==================================================>]     969B/969B
 cad436dd248c Extracting [==================================================>]     969B/969B
 061a1e719d12 Extracting [>                                                  ]  1.671MB/195.8MB
 95b4572be167 Downloading [===============================>                   ]  121.8MB/193MB
 2ea3ebf7d306 Downloading [>                                                  ]  9.561kB/918.3kB
 cad436dd248c Pull complete 
 2ea3ebf7d306 Downloading [==============>                                    ]  270.3kB/918.3kB
 95b4572be167 Downloading [===============================>                   ]  123.4MB/193MB
 2ea3ebf7d306 Downloading [===========================>                       ]  502.4kB/918.3kB
 2ea3ebf7d306 Verifying Checksum 
 2ea3ebf7d306 Download complete 
 2ea3ebf7d306 Extracting [=>                                                 ]  32.77kB/918.3kB
 95b4572be167 Downloading [================================>                  ]  124.4MB/193MB
 061a1e719d12 Extracting [>                                                  ]  2.228MB/195.8MB
 2ea3ebf7d306 Extracting [=================>                                 ]  327.7kB/918.3kB
 84a991b0a3f7 Downloading [==================================================>]     170B/170B
 84a991b0a3f7 Verifying Checksum 
 84a991b0a3f7 Download complete 
 95b4572be167 Downloading [================================>                  ]    125MB/193MB
 2ea3ebf7d306 Extracting [================================>                  ]  589.8kB/918.3kB
 95b4572be167 Downloading [================================>                  ]    126MB/193MB
 2ea3ebf7d306 Extracting [=========================================>         ]  753.7kB/918.3kB
 fe4b54c62f54 Extracting [>                                                  ]  1.671MB/199.9MB
 95b4572be167 Downloading [===================================>               ]  135.1MB/193MB
 2ea3ebf7d306 Extracting [============================================>      ]  819.2kB/918.3kB
 2ea3ebf7d306 Extracting [==================================================>]  918.3kB/918.3kB
 95b4572be167 Downloading [===================================>               ]  138.4MB/193MB
 061a1e719d12 Extracting [>                                                  ]  2.785MB/195.8MB
 3945a9548b2f Downloading [==================================================>]     114B/114B
 3945a9548b2f Verifying Checksum 
 3945a9548b2f Download complete 
 2ea3ebf7d306 Pull complete 
 84a991b0a3f7 Extracting [==================================================>]     170B/170B
 84a991b0a3f7 Extracting [==================================================>]     170B/170B
 95b4572be167 Downloading [====================================>              ]    140MB/193MB
 84a991b0a3f7 Pull complete 
 3945a9548b2f Extracting [==================================================>]     114B/114B
 3945a9548b2f Extracting [==================================================>]     114B/114B
 95b4572be167 Downloading [=====================================>             ]  143.2MB/193MB
 3945a9548b2f Pull complete 
 95b4572be167 Downloading [=====================================>             ]  146.4MB/193MB
 a623f40cda43 Downloading [>                                                  ]  540.7kB/103.9MB
 061a1e719d12 Extracting [>                                                  ]  3.342MB/195.8MB
 a623f40cda43 Downloading [=>                                                 ]  3.759MB/103.9MB
 95b4572be167 Downloading [=======================================>           ]  152.3MB/193MB
 c60bbb65edfc Downloading [====>                                              ]     934B/9.448kB
 c60bbb65edfc Downloading [==================================================>]  9.448kB/9.448kB
 c60bbb65edfc Verifying Checksum 
 c60bbb65edfc Download complete 
 a623f40cda43 Downloading [==>                                                ]  4.829MB/103.9MB
 a623f40cda43 Downloading [===>                                               ]  6.954MB/103.9MB
 95b4572be167 Downloading [=========================================>         ]  160.3MB/193MB
 061a1e719d12 Extracting [>                                                  ]  3.899MB/195.8MB
 a623f40cda43 Downloading [===>                                               ]  7.495MB/103.9MB
 95b4572be167 Downloading [==========================================>        ]    163MB/193MB
 95b4572be167 Downloading [==========================================>        ]  164.1MB/193MB
 a623f40cda43 Downloading [====>                                              ]  8.564MB/103.9MB
 061a1e719d12 Extracting [=>                                                 ]  4.456MB/195.8MB
 95b4572be167 Downloading [===========================================>       ]  166.8MB/193MB
 a623f40cda43 Downloading [====>                                              ]  9.644MB/103.9MB
 76774548c03c Downloading [==================================================>]     128B/128B
 76774548c03c Verifying Checksum 
 76774548c03c Download complete 
 95b4572be167 Downloading [===========================================>       ]  167.8MB/193MB
 061a1e719d12 Extracting [=>                                                 ]  5.014MB/195.8MB
 a623f40cda43 Downloading [====>                                              ]  10.17MB/103.9MB
 95b4572be167 Downloading [===========================================>       ]  168.9MB/193MB
 fe4b54c62f54 Extracting [>                                                  ]  2.228MB/199.9MB
 a623f40cda43 Downloading [=======>                                           ]   15.5MB/103.9MB
 95b4572be167 Downloading [============================================>      ]  172.6MB/193MB
 95b4572be167 Downloading [============================================>      ]  173.7MB/193MB
 a623f40cda43 Downloading [=======>                                           ]  16.58MB/103.9MB
 a623f40cda43 Downloading [========>                                          ]  17.65MB/103.9MB
 95b4572be167 Downloading [=============================================>     ]  174.2MB/193MB
 061a1e719d12 Extracting [=>                                                 ]  5.571MB/195.8MB
 95b4572be167 Downloading [==============================================>    ]  179.1MB/193MB
 a623f40cda43 Downloading [===========>                                       ]  22.99MB/103.9MB
 fe4b54c62f54 Extracting [>                                                  ]  2.785MB/199.9MB
 b1b6b375f3c3 Downloading [==================================================>]     170B/170B
 b1b6b375f3c3 Verifying Checksum 
 b1b6b375f3c3 Download complete 
 061a1e719d12 Extracting [=>                                                 ]  6.128MB/195.8MB
 95b4572be167 Downloading [==============================================>    ]  180.1MB/193MB
 a623f40cda43 Downloading [===========>                                       ]  24.07MB/103.9MB
 fe4b54c62f54 Extracting [>                                                  ]  3.342MB/199.9MB
 a623f40cda43 Downloading [============>                                      ]  26.21MB/103.9MB
 95b4572be167 Downloading [==============================================>    ]  181.2MB/193MB
 061a1e719d12 Extracting [=>                                                 ]  6.685MB/195.8MB
 a623f40cda43 Downloading [===============>                                   ]  32.13MB/103.9MB
 fe4b54c62f54 Extracting [>                                                  ]  3.899MB/199.9MB
 95b4572be167 Downloading [================================================>  ]  185.5MB/193MB
 a623f40cda43 Downloading [===============>                                   ]  33.19MB/103.9MB
 95b4572be167 Downloading [================================================>  ]  186.6MB/193MB
 fe4b54c62f54 Extracting [=>                                                 ]  4.456MB/199.9MB
 061a1e719d12 Extracting [=>                                                 ]  7.242MB/195.8MB
 6cd0b72d8da2 Downloading [========>                                          ]     953B/5.93kB
 6cd0b72d8da2 Downloading [==================================================>]   5.93kB/5.93kB
 6cd0b72d8da2 Verifying Checksum 
 6cd0b72d8da2 Download complete 
 a623f40cda43 Downloading [=================>                                 ]  35.33MB/103.9MB
 95b4572be167 Downloading [================================================>  ]  187.6MB/193MB
 061a1e719d12 Extracting [=>                                                 ]  7.799MB/195.8MB
 a623f40cda43 Downloading [=================>                                 ]  36.42MB/103.9MB
 fe4b54c62f54 Extracting [=>                                                 ]  5.014MB/199.9MB
 a623f40cda43 Downloading [==================>                                ]   37.5MB/103.9MB
 061a1e719d12 Extracting [==>                                                ]  8.356MB/195.8MB
 95b4572be167 Downloading [=================================================> ]  189.8MB/193MB
 a623f40cda43 Downloading [==================>                                ]  38.57MB/103.9MB
 fe4b54c62f54 Extracting [=>                                                 ]  5.571MB/199.9MB
 95b4572be167 Downloading [=================================================> ]  190.9MB/193MB
 6986ebe18735 Downloading [==================================================>]     184B/184B
 6986ebe18735 Verifying Checksum 
 6986ebe18735 Download complete 
 061a1e719d12 Extracting [==>                                                ]  8.913MB/195.8MB
 fe4b54c62f54 Extracting [=>                                                 ]  6.128MB/199.9MB
 a623f40cda43 Downloading [===================>                               ]  39.65MB/103.9MB
 95b4572be167 Downloading [=================================================> ]  191.9MB/193MB
 061a1e719d12 Extracting [==>                                                ]   9.47MB/195.8MB
 a623f40cda43 Downloading [====================>                              ]  41.78MB/103.9MB
 95b4572be167 Downloading [=================================================> ]    193MB/193MB
 95b4572be167 Verifying Checksum 
 95b4572be167 Download complete 
 061a1e719d12 Extracting [==>                                                ]  10.03MB/195.8MB
 a623f40cda43 Downloading [====================>                              ]  43.38MB/103.9MB
 061a1e719d12 Extracting [==>                                                ]  10.58MB/195.8MB
 a623f40cda43 Downloading [=====================>                             ]  44.99MB/103.9MB
 a623f40cda43 Downloading [======================>                            ]  46.06MB/103.9MB
 061a1e719d12 Extracting [==>                                                ]  11.14MB/195.8MB
 a623f40cda43 Downloading [======================>                            ]  47.68MB/103.9MB
 a623f40cda43 Downloading [=======================>                           ]  49.83MB/103.9MB
 fe4b54c62f54 Extracting [=>                                                 ]  6.685MB/199.9MB
 a623f40cda43 Downloading [==========================>                        ]  55.73MB/103.9MB
 061a1e719d12 Extracting [==>                                                ]   11.7MB/195.8MB
 a623f40cda43 Downloading [===========================>                       ]   56.8MB/103.9MB
 a623f40cda43 Downloading [===========================>                       ]  57.33MB/103.9MB
 061a1e719d12 Extracting [===>                                               ]  12.26MB/195.8MB
 a623f40cda43 Downloading [============================>                      ]   58.4MB/103.9MB
 061a1e719d12 Extracting [===>                                               ]  12.81MB/195.8MB
 a623f40cda43 Downloading [============================>                      ]  59.48MB/103.9MB
 fe4b54c62f54 Extracting [=>                                                 ]  7.242MB/199.9MB
 a623f40cda43 Downloading [==============================>                    ]  62.68MB/103.9MB
 061a1e719d12 Extracting [===>                                               ]  13.93MB/195.8MB
 a623f40cda43 Downloading [==============================>                    ]   64.3MB/103.9MB
 fe4b54c62f54 Extracting [=>                                                 ]  7.799MB/199.9MB
 061a1e719d12 Extracting [===>                                               ]  14.48MB/195.8MB
 fe4b54c62f54 Extracting [==>                                                ]  8.356MB/199.9MB
 a623f40cda43 Downloading [===============================>                   ]  65.38MB/103.9MB
 061a1e719d12 Extracting [===>                                               ]  15.04MB/195.8MB
 a623f40cda43 Downloading [=================================>                 ]  69.66MB/103.9MB
 fe4b54c62f54 Extracting [==>                                                ]  8.913MB/199.9MB
 061a1e719d12 Extracting [====>                                              ]  16.15MB/195.8MB
 a623f40cda43 Downloading [===================================>               ]  72.87MB/103.9MB
 fe4b54c62f54 Extracting [==>                                                ]  10.03MB/199.9MB
 fe4b54c62f54 Extracting [==>                                                ]  10.58MB/199.9MB
 a623f40cda43 Downloading [=======================================>           ]  81.98MB/103.9MB
 061a1e719d12 Extracting [====>                                              ]  17.27MB/195.8MB
 a623f40cda43 Downloading [=======================================>           ]  83.07MB/103.9MB
 fe4b54c62f54 Extracting [==>                                                ]  11.14MB/199.9MB
 a623f40cda43 Downloading [========================================>          ]  84.15MB/103.9MB
 fe4b54c62f54 Extracting [==>                                                ]   11.7MB/199.9MB
 061a1e719d12 Extracting [====>                                              ]  17.83MB/195.8MB
 a623f40cda43 Downloading [==========================================>        ]  88.47MB/103.9MB
 061a1e719d12 Extracting [====>                                              ]  18.38MB/195.8MB
 fe4b54c62f54 Extracting [===>                                               ]  12.81MB/199.9MB
 a623f40cda43 Downloading [===========================================>       ]  91.14MB/103.9MB
 061a1e719d12 Extracting [====>                                              ]  18.94MB/195.8MB
 fe4b54c62f54 Extracting [===>                                               ]  13.37MB/199.9MB
 a623f40cda43 Downloading [==============================================>    ]  95.97MB/103.9MB
 061a1e719d12 Extracting [====>                                              ]   19.5MB/195.8MB
 fe4b54c62f54 Extracting [===>                                               ]  13.93MB/199.9MB
 a623f40cda43 Downloading [==============================================>    ]  97.04MB/103.9MB
 a623f40cda43 Downloading [===============================================>   ]  98.11MB/103.9MB
 a623f40cda43 Verifying Checksum 
 a623f40cda43 Download complete 
 061a1e719d12 Extracting [=====>                                             ]  20.05MB/195.8MB
 fe4b54c62f54 Extracting [===>                                               ]  14.48MB/199.9MB
 a623f40cda43 Extracting [>                                                  ]  557.1kB/103.9MB
 061a1e719d12 Extracting [=====>                                             ]  20.61MB/195.8MB
 fe4b54c62f54 Extracting [===>                                               ]  15.04MB/199.9MB
 fe4b54c62f54 Extracting [===>                                               ]   15.6MB/199.9MB
 061a1e719d12 Extracting [=====>                                             ]  21.17MB/195.8MB
 a623f40cda43 Extracting [>                                                  ]  1.671MB/103.9MB
 fe4b54c62f54 Extracting [====>                                              ]  16.15MB/199.9MB
 061a1e719d12 Extracting [=====>                                             ]  21.73MB/195.8MB
 a623f40cda43 Extracting [=>                                                 ]  2.228MB/103.9MB
 fe4b54c62f54 Extracting [====>                                              ]  16.71MB/199.9MB
 a623f40cda43 Extracting [=>                                                 ]  2.785MB/103.9MB
 061a1e719d12 Extracting [=====>                                             ]  22.28MB/195.8MB
 fe4b54c62f54 Extracting [====>                                              ]  17.27MB/199.9MB
 a623f40cda43 Extracting [=>                                                 ]  3.342MB/103.9MB
 fe4b54c62f54 Extracting [====>                                              ]  17.83MB/199.9MB
 061a1e719d12 Extracting [=====>                                             ]  22.84MB/195.8MB
 a623f40cda43 Extracting [=>                                                 ]  3.899MB/103.9MB
 fe4b54c62f54 Extracting [====>                                              ]  18.38MB/199.9MB
 061a1e719d12 Extracting [=====>                                             ]   23.4MB/195.8MB
 a623f40cda43 Extracting [==>                                                ]  4.456MB/103.9MB
 fe4b54c62f54 Extracting [====>                                              ]  18.94MB/199.9MB
 061a1e719d12 Extracting [======>                                            ]  23.95MB/195.8MB
 a623f40cda43 Extracting [==>                                                ]  5.014MB/103.9MB
 fe4b54c62f54 Extracting [====>                                              ]   19.5MB/199.9MB
 a623f40cda43 Extracting [==>                                                ]  5.571MB/103.9MB
 061a1e719d12 Extracting [======>                                            ]  24.51MB/195.8MB
 fe4b54c62f54 Extracting [=====>                                             ]  20.05MB/199.9MB
 a623f40cda43 Extracting [==>                                                ]  6.128MB/103.9MB
 fe4b54c62f54 Extracting [=====>                                             ]  20.61MB/199.9MB
 061a1e719d12 Extracting [======>                                            ]  25.07MB/195.8MB
 061a1e719d12 Extracting [======>                                            ]  25.62MB/195.8MB
 fe4b54c62f54 Extracting [=====>                                             ]  21.73MB/199.9MB
 a623f40cda43 Extracting [===>                                               ]  7.242MB/103.9MB
 fe4b54c62f54 Extracting [=====>                                             ]  22.28MB/199.9MB
 a623f40cda43 Extracting [===>                                               ]  7.799MB/103.9MB
 061a1e719d12 Extracting [======>                                            ]  26.74MB/195.8MB
 061a1e719d12 Extracting [======>                                            ]   27.3MB/195.8MB
 a623f40cda43 Extracting [====>                                              ]  8.356MB/103.9MB
 fe4b54c62f54 Extracting [=====>                                             ]  22.84MB/199.9MB
 061a1e719d12 Extracting [=======>                                           ]  27.85MB/195.8MB
 fe4b54c62f54 Extracting [=====>                                             ]   23.4MB/199.9MB
 a623f40cda43 Extracting [====>                                              ]  8.913MB/103.9MB
 a623f40cda43 Extracting [====>                                              ]  10.03MB/103.9MB
 061a1e719d12 Extracting [=======>                                           ]  28.97MB/195.8MB
 fe4b54c62f54 Extracting [======>                                            ]  24.51MB/199.9MB
 a623f40cda43 Extracting [=====>                                             ]   11.7MB/103.9MB
 061a1e719d12 Extracting [=======>                                           ]  30.08MB/195.8MB
 a623f40cda43 Extracting [=====>                                             ]  12.26MB/103.9MB
 fe4b54c62f54 Extracting [======>                                            ]  26.18MB/199.9MB
 061a1e719d12 Extracting [=======>                                           ]  30.64MB/195.8MB
 fe4b54c62f54 Extracting [======>                                            ]   27.3MB/199.9MB
 a623f40cda43 Extracting [======>                                            ]  13.37MB/103.9MB
 061a1e719d12 Extracting [========>                                          ]  31.75MB/195.8MB
 a623f40cda43 Extracting [=======>                                           ]  15.04MB/103.9MB
 fe4b54c62f54 Extracting [=======>                                           ]  28.97MB/199.9MB
 061a1e719d12 Extracting [========>                                          ]  32.87MB/195.8MB
 a623f40cda43 Extracting [=======>                                           ]   15.6MB/103.9MB
 fe4b54c62f54 Extracting [=======>                                           ]  29.52MB/199.9MB
 061a1e719d12 Extracting [========>                                          ]  33.42MB/195.8MB
 a623f40cda43 Extracting [========>                                          ]  16.71MB/103.9MB
 fe4b54c62f54 Extracting [=======>                                           ]  30.64MB/199.9MB
 061a1e719d12 Extracting [========>                                          ]  34.54MB/195.8MB
 fe4b54c62f54 Extracting [=======>                                           ]  31.75MB/199.9MB
 a623f40cda43 Extracting [========>                                          ]  18.38MB/103.9MB
 061a1e719d12 Extracting [=========>                                         ]  35.65MB/195.8MB
 fe4b54c62f54 Extracting [========>                                          ]  32.31MB/199.9MB
 a623f40cda43 Extracting [=========>                                         ]   19.5MB/103.9MB
 061a1e719d12 Extracting [=========>                                         ]  36.77MB/195.8MB
 fe4b54c62f54 Extracting [========>                                          ]  33.42MB/199.9MB
 a623f40cda43 Extracting [==========>                                        ]  21.17MB/103.9MB
 061a1e719d12 Extracting [=========>                                         ]  38.44MB/195.8MB
 fe4b54c62f54 Extracting [========>                                          ]  35.09MB/199.9MB
 a623f40cda43 Extracting [==========>                                        ]  21.73MB/103.9MB
 061a1e719d12 Extracting [=========>                                         ]  38.99MB/195.8MB
 fe4b54c62f54 Extracting [========>                                          ]  35.65MB/199.9MB
 061a1e719d12 Extracting [==========>                                        ]  39.55MB/195.8MB
 a623f40cda43 Extracting [==========>                                        ]  22.28MB/103.9MB
 fe4b54c62f54 Extracting [=========>                                         ]  36.21MB/199.9MB
 061a1e719d12 Extracting [==========>                                        ]  40.67MB/195.8MB
 a623f40cda43 Extracting [===========>                                       ]  23.95MB/103.9MB
 fe4b54c62f54 Extracting [=========>                                         ]  37.32MB/199.9MB
 061a1e719d12 Extracting [==========>                                        ]  41.78MB/195.8MB
 fe4b54c62f54 Extracting [=========>                                         ]  38.44MB/199.9MB
 a623f40cda43 Extracting [============>                                      ]  25.62MB/103.9MB
 061a1e719d12 Extracting [==========>                                        ]  42.89MB/195.8MB
 fe4b54c62f54 Extracting [=========>                                         ]  38.99MB/199.9MB
 a623f40cda43 Extracting [============>                                      ]  26.18MB/103.9MB
 fe4b54c62f54 Extracting [=========>                                         ]  39.55MB/199.9MB
 061a1e719d12 Extracting [===========>                                       ]  44.01MB/195.8MB
 a623f40cda43 Extracting [============>                                      ]  26.74MB/103.9MB
 fe4b54c62f54 Extracting [==========>                                        ]  40.11MB/199.9MB
 061a1e719d12 Extracting [===========>                                       ]  44.56MB/195.8MB
 a623f40cda43 Extracting [=============>                                     ]   27.3MB/103.9MB
 fe4b54c62f54 Extracting [==========>                                        ]  40.67MB/199.9MB
 061a1e719d12 Extracting [===========>                                       ]  45.68MB/195.8MB
 a623f40cda43 Extracting [=============>                                     ]  28.41MB/103.9MB
 fe4b54c62f54 Extracting [==========>                                        ]  42.34MB/199.9MB
 061a1e719d12 Extracting [============>                                      ]  47.35MB/195.8MB
 a623f40cda43 Extracting [==============>                                    ]  29.52MB/103.9MB
 fe4b54c62f54 Extracting [==========>                                        ]  43.45MB/199.9MB
 061a1e719d12 Extracting [============>                                      ]  49.02MB/195.8MB
 a623f40cda43 Extracting [===============>                                   ]   31.2MB/103.9MB
 fe4b54c62f54 Extracting [===========>                                       ]  44.01MB/199.9MB
 061a1e719d12 Extracting [============>                                      ]  49.58MB/195.8MB
 a623f40cda43 Extracting [===============>                                   ]  31.75MB/103.9MB
 061a1e719d12 Extracting [============>                                      ]  50.14MB/195.8MB
 fe4b54c62f54 Extracting [===========>                                       ]  44.56MB/199.9MB
 a623f40cda43 Extracting [===============>                                   ]  32.31MB/103.9MB
 061a1e719d12 Extracting [============>                                      ]  50.69MB/195.8MB
 fe4b54c62f54 Extracting [===========>                                       ]  45.12MB/199.9MB
 a623f40cda43 Extracting [===============>                                   ]  32.87MB/103.9MB
 061a1e719d12 Extracting [=============>                                     ]  51.25MB/195.8MB
 a623f40cda43 Extracting [================>                                  ]  33.42MB/103.9MB
 fe4b54c62f54 Extracting [===========>                                       ]  45.68MB/199.9MB
 a623f40cda43 Extracting [================>                                  ]  33.98MB/103.9MB
 061a1e719d12 Extracting [=============>                                     ]  51.81MB/195.8MB
 fe4b54c62f54 Extracting [===========>                                       ]  46.79MB/199.9MB
 a623f40cda43 Extracting [=================>                                 ]  35.65MB/103.9MB
 061a1e719d12 Extracting [=============>                                     ]  53.48MB/195.8MB
 fe4b54c62f54 Extracting [===========>                                       ]  47.91MB/199.9MB
 a623f40cda43 Extracting [=================>                                 ]  36.77MB/103.9MB
 061a1e719d12 Extracting [=============>                                     ]  54.59MB/195.8MB
 fe4b54c62f54 Extracting [============>                                      ]  48.46MB/199.9MB
 a623f40cda43 Extracting [=================>                                 ]  37.32MB/103.9MB
 061a1e719d12 Extracting [==============>                                    ]  55.15MB/195.8MB
 fe4b54c62f54 Extracting [============>                                      ]  49.02MB/199.9MB
 a623f40cda43 Extracting [==================>                                ]  37.88MB/103.9MB
 061a1e719d12 Extracting [==============>                                    ]  55.71MB/195.8MB
 fe4b54c62f54 Extracting [============>                                      ]  49.58MB/199.9MB
 061a1e719d12 Extracting [==============>                                    ]  56.26MB/195.8MB
 a623f40cda43 Extracting [==================>                                ]  38.99MB/103.9MB
 fe4b54c62f54 Extracting [============>                                      ]  50.69MB/199.9MB
 061a1e719d12 Extracting [==============>                                    ]  57.38MB/195.8MB
 a623f40cda43 Extracting [===================>                               ]  40.11MB/103.9MB
 fe4b54c62f54 Extracting [============>                                      ]  51.81MB/199.9MB
 061a1e719d12 Extracting [===============>                                   ]  59.05MB/195.8MB
 a623f40cda43 Extracting [====================>                              ]  41.78MB/103.9MB
 fe4b54c62f54 Extracting [=============>                                     ]  54.03MB/199.9MB
 061a1e719d12 Extracting [===============>                                   ]  60.72MB/195.8MB
 a623f40cda43 Extracting [====================>                              ]  43.45MB/103.9MB
 fe4b54c62f54 Extracting [=============>                                     ]  55.15MB/199.9MB
 061a1e719d12 Extracting [===============>                                   ]  61.83MB/195.8MB
 fe4b54c62f54 Extracting [=============>                                     ]  55.71MB/199.9MB
 a623f40cda43 Extracting [=====================>                             ]  44.56MB/103.9MB
 061a1e719d12 Extracting [================>                                  ]  62.95MB/195.8MB
 a623f40cda43 Extracting [=====================>                             ]  45.68MB/103.9MB
 fe4b54c62f54 Extracting [==============>                                    ]  56.82MB/199.9MB
 061a1e719d12 Extracting [================>                                  ]   63.5MB/195.8MB
 a623f40cda43 Extracting [======================>                            ]  46.24MB/103.9MB
 fe4b54c62f54 Extracting [==============>                                    ]  57.38MB/199.9MB
 a623f40cda43 Extracting [======================>                            ]  47.35MB/103.9MB
 fe4b54c62f54 Extracting [==============>                                    ]  58.49MB/199.9MB
 061a1e719d12 Extracting [================>                                  ]  64.62MB/195.8MB
 a623f40cda43 Extracting [=======================>                           ]  48.46MB/103.9MB
 fe4b54c62f54 Extracting [==============>                                    ]   59.6MB/199.9MB
 061a1e719d12 Extracting [================>                                  ]  65.73MB/195.8MB
 a623f40cda43 Extracting [=======================>                           ]  49.02MB/103.9MB
 fe4b54c62f54 Extracting [===============>                                   ]  60.72MB/199.9MB
 061a1e719d12 Extracting [=================>                                 ]  66.85MB/195.8MB
 fe4b54c62f54 Extracting [===============>                                   ]  61.83MB/199.9MB
 a623f40cda43 Extracting [========================>                          ]  50.69MB/103.9MB
 fe4b54c62f54 Extracting [===============>                                   ]  62.39MB/199.9MB
 061a1e719d12 Extracting [=================>                                 ]  67.96MB/195.8MB
 fe4b54c62f54 Extracting [===============>                                   ]  62.95MB/199.9MB
 a623f40cda43 Extracting [========================>                          ]  51.81MB/103.9MB
 061a1e719d12 Extracting [=================>                                 ]  68.52MB/195.8MB
 fe4b54c62f54 Extracting [===============>                                   ]   63.5MB/199.9MB
 061a1e719d12 Extracting [=================>                                 ]  69.07MB/195.8MB
 a623f40cda43 Extracting [=========================>                         ]  52.36MB/103.9MB
 fe4b54c62f54 Extracting [================>                                  ]  64.06MB/199.9MB
 061a1e719d12 Extracting [=================>                                 ]  69.63MB/195.8MB
 a623f40cda43 Extracting [=========================>                         ]  53.48MB/103.9MB
 061a1e719d12 Extracting [==================>                                ]  70.75MB/195.8MB
 fe4b54c62f54 Extracting [================>                                  ]  65.73MB/199.9MB
 a623f40cda43 Extracting [==========================>                        ]  54.59MB/103.9MB
 fe4b54c62f54 Extracting [================>                                  ]  66.29MB/199.9MB
 061a1e719d12 Extracting [==================>                                ]   71.3MB/195.8MB
 a623f40cda43 Extracting [==========================>                        ]  55.15MB/103.9MB
 a623f40cda43 Extracting [==========================>                        ]  55.71MB/103.9MB
 fe4b54c62f54 Extracting [================>                                  ]   67.4MB/199.9MB
 061a1e719d12 Extracting [==================>                                ]  72.42MB/195.8MB
 061a1e719d12 Extracting [==================>                                ]  73.53MB/195.8MB
 a623f40cda43 Extracting [===========================>                       ]  57.38MB/103.9MB
 fe4b54c62f54 Extracting [=================>                                 ]  69.07MB/199.9MB
 061a1e719d12 Extracting [==================>                                ]  74.09MB/195.8MB
 a623f40cda43 Extracting [============================>                      ]  58.49MB/103.9MB
 fe4b54c62f54 Extracting [=================>                                 ]  70.19MB/199.9MB
 061a1e719d12 Extracting [===================>                               ]  75.76MB/195.8MB
 fe4b54c62f54 Extracting [=================>                                 ]   71.3MB/199.9MB
 a623f40cda43 Extracting [=============================>                     ]  60.72MB/103.9MB
 061a1e719d12 Extracting [===================>                               ]  77.43MB/195.8MB
 fe4b54c62f54 Extracting [==================>                                ]  72.97MB/199.9MB
 a623f40cda43 Extracting [==============================>                    ]  62.39MB/103.9MB
 061a1e719d12 Extracting [====================>                              ]   79.1MB/195.8MB
 fe4b54c62f54 Extracting [==================>                                ]  74.65MB/199.9MB
 a623f40cda43 Extracting [===============================>                   ]  64.62MB/103.9MB
 061a1e719d12 Extracting [====================>                              ]  80.77MB/195.8MB
 fe4b54c62f54 Extracting [==================>                                ]  75.76MB/199.9MB
 a623f40cda43 Extracting [===============================>                   ]  65.73MB/103.9MB
 061a1e719d12 Extracting [====================>                              ]  81.89MB/195.8MB
 fe4b54c62f54 Extracting [===================>                               ]  76.87MB/199.9MB
 a623f40cda43 Extracting [================================>                  ]  67.96MB/103.9MB
 061a1e719d12 Extracting [=====================>                             ]  83.56MB/195.8MB
 fe4b54c62f54 Extracting [===================>                               ]  78.54MB/199.9MB
 a623f40cda43 Extracting [=================================>                 ]  69.63MB/103.9MB
 fe4b54c62f54 Extracting [====================>                              ]  80.77MB/199.9MB
 061a1e719d12 Extracting [=====================>                             ]  85.79MB/195.8MB
 a623f40cda43 Extracting [==================================>                ]  71.86MB/103.9MB
 fe4b54c62f54 Extracting [====================>                              ]     83MB/199.9MB
 061a1e719d12 Extracting [======================>                            ]  88.01MB/195.8MB
 fe4b54c62f54 Extracting [====================>                              ]  83.56MB/199.9MB
 a623f40cda43 Extracting [===================================>               ]  73.53MB/103.9MB
 061a1e719d12 Extracting [======================>                            ]  88.57MB/195.8MB
 061a1e719d12 Extracting [======================>                            ]  89.13MB/195.8MB
 fe4b54c62f54 Extracting [=====================>                             ]  84.67MB/199.9MB
 a623f40cda43 Extracting [===================================>               ]  74.65MB/103.9MB
 061a1e719d12 Extracting [======================>                            ]  89.69MB/195.8MB
 fe4b54c62f54 Extracting [=====================>                             ]  85.23MB/199.9MB
 a623f40cda43 Extracting [====================================>              ]  75.76MB/103.9MB
 061a1e719d12 Extracting [=======================>                           ]   90.8MB/195.8MB
 fe4b54c62f54 Extracting [=====================>                             ]   86.9MB/199.9MB
 a623f40cda43 Extracting [=====================================>             ]  77.43MB/103.9MB
 061a1e719d12 Extracting [=======================>                           ]  91.91MB/195.8MB
 a623f40cda43 Extracting [======================================>            ]   79.1MB/103.9MB
 fe4b54c62f54 Extracting [======================>                            ]  88.01MB/199.9MB
 061a1e719d12 Extracting [=======================>                           ]  93.03MB/195.8MB
 061a1e719d12 Extracting [========================>                          ]   94.7MB/195.8MB
 a623f40cda43 Extracting [=======================================>           ]  81.33MB/103.9MB
 fe4b54c62f54 Extracting [======================>                            ]  89.69MB/199.9MB
 fe4b54c62f54 Extracting [======================>                            ]   90.8MB/199.9MB
 a623f40cda43 Extracting [========================================>          ]  83.56MB/103.9MB
 061a1e719d12 Extracting [========================>                          ]  96.37MB/195.8MB
 fe4b54c62f54 Extracting [======================>                            ]  91.36MB/199.9MB
 a623f40cda43 Extracting [========================================>          ]  84.67MB/103.9MB
 061a1e719d12 Extracting [========================>                          ]  97.48MB/195.8MB
 fe4b54c62f54 Extracting [=======================>                           ]  93.03MB/199.9MB
 a623f40cda43 Extracting [=========================================>         ]   86.9MB/103.9MB
 061a1e719d12 Extracting [=========================>                         ]  99.16MB/195.8MB
 a623f40cda43 Extracting [==========================================>        ]  89.13MB/103.9MB
 fe4b54c62f54 Extracting [=======================>                           ]   94.7MB/199.9MB
 061a1e719d12 Extracting [=========================>                         ]  100.8MB/195.8MB
 a623f40cda43 Extracting [===========================================>       ]   90.8MB/103.9MB
 fe4b54c62f54 Extracting [=======================>                           ]  95.81MB/199.9MB
 061a1e719d12 Extracting [==========================>                        ]  101.9MB/195.8MB
 a623f40cda43 Extracting [============================================>      ]  93.03MB/103.9MB
 061a1e719d12 Extracting [==========================>                        ]  103.6MB/195.8MB
 fe4b54c62f54 Extracting [========================>                          ]  98.04MB/199.9MB
 a623f40cda43 Extracting [=============================================>     ]  95.26MB/103.9MB
 fe4b54c62f54 Extracting [========================>                          ]  99.71MB/199.9MB
 061a1e719d12 Extracting [===========================>                       ]  105.8MB/195.8MB
 a623f40cda43 Extracting [==============================================>    ]  96.93MB/103.9MB
 fe4b54c62f54 Extracting [=========================>                         ]  101.4MB/199.9MB
 061a1e719d12 Extracting [===========================>                       ]  107.5MB/195.8MB
 a623f40cda43 Extracting [===============================================>   ]   98.6MB/103.9MB
 fe4b54c62f54 Extracting [=========================>                         ]  103.1MB/199.9MB
 061a1e719d12 Extracting [============================>                      ]  109.7MB/195.8MB
 a623f40cda43 Extracting [================================================>  ]  100.3MB/103.9MB
 fe4b54c62f54 Extracting [==========================>                        ]  105.3MB/199.9MB
 061a1e719d12 Extracting [============================>                      ]    112MB/195.8MB
 a623f40cda43 Extracting [=================================================> ]  101.9MB/103.9MB
 fe4b54c62f54 Extracting [==========================>                        ]    107MB/199.9MB
 a623f40cda43 Extracting [=================================================> ]  103.1MB/103.9MB
 061a1e719d12 Extracting [============================>                      ]  113.1MB/195.8MB
 fe4b54c62f54 Extracting [===========================>                       ]  108.1MB/199.9MB
 a623f40cda43 Extracting [==================================================>]  103.9MB/103.9MB
 061a1e719d12 Extracting [=============================>                     ]  114.2MB/195.8MB
 fe4b54c62f54 Extracting [===========================>                       ]  109.2MB/199.9MB
 a623f40cda43 Pull complete 
 c60bbb65edfc Extracting [==================================================>]  9.448kB/9.448kB
 c60bbb65edfc Extracting [==================================================>]  9.448kB/9.448kB
 c60bbb65edfc Pull complete 
 76774548c03c Extracting [==================================================>]     128B/128B
 76774548c03c Extracting [==================================================>]     128B/128B
 76774548c03c Pull complete 
 b1b6b375f3c3 Extracting [==================================================>]     170B/170B
 b1b6b375f3c3 Extracting [==================================================>]     170B/170B
 b1b6b375f3c3 Pull complete 
 6cd0b72d8da2 Extracting [==================================================>]   5.93kB/5.93kB
 6cd0b72d8da2 Extracting [==================================================>]   5.93kB/5.93kB
 6cd0b72d8da2 Pull complete 
 6986ebe18735 Extracting [==================================================>]     184B/184B
 6986ebe18735 Extracting [==================================================>]     184B/184B
 fe4b54c62f54 Extracting [===========================>                       ]  110.3MB/199.9MB
 6986ebe18735 Pull complete 
 061a1e719d12 Extracting [=============================>                     ]  115.3MB/195.8MB
 postgres Pulled 
 fe4b54c62f54 Extracting [============================>                      ]    112MB/199.9MB
 061a1e719d12 Extracting [==============================>                    ]  117.5MB/195.8MB
 fe4b54c62f54 Extracting [============================>                      ]  114.2MB/199.9MB
 061a1e719d12 Extracting [==============================>                    ]  120.3MB/195.8MB
 fe4b54c62f54 Extracting [=============================>                     ]    117MB/199.9MB
 fe4b54c62f54 Extracting [=============================>                     ]  118.1MB/199.9MB
 061a1e719d12 Extracting [===============================>                   ]  122.6MB/195.8MB
 fe4b54c62f54 Extracting [=============================>                     ]  118.7MB/199.9MB
 061a1e719d12 Extracting [===============================>                   ]  123.1MB/195.8MB
 061a1e719d12 Extracting [===============================>                   ]  123.7MB/195.8MB
 fe4b54c62f54 Extracting [=============================>                     ]  119.8MB/199.9MB
 061a1e719d12 Extracting [===============================>                   ]  124.2MB/195.8MB
 fe4b54c62f54 Extracting [==============================>                    ]    122MB/199.9MB
 061a1e719d12 Extracting [================================>                  ]  125.9MB/195.8MB
 fe4b54c62f54 Extracting [===============================>                   ]  124.8MB/199.9MB
 061a1e719d12 Extracting [================================>                  ]  128.1MB/195.8MB
 061a1e719d12 Extracting [=================================>                 ]  129.2MB/195.8MB
 fe4b54c62f54 Extracting [===============================>                   ]  126.5MB/199.9MB
 fe4b54c62f54 Extracting [===============================>                   ]  127.6MB/199.9MB
 061a1e719d12 Extracting [=================================>                 ]  130.4MB/195.8MB
 fe4b54c62f54 Extracting [================================>                  ]  128.1MB/199.9MB
 fe4b54c62f54 Extracting [================================>                  ]  128.7MB/199.9MB
 061a1e719d12 Extracting [=================================>                 ]  130.9MB/195.8MB
 fe4b54c62f54 Extracting [================================>                  ]  129.2MB/199.9MB
 061a1e719d12 Extracting [=================================>                 ]  131.5MB/195.8MB
 061a1e719d12 Extracting [=================================>                 ]    132MB/195.8MB
 fe4b54c62f54 Extracting [================================>                  ]  129.8MB/199.9MB
 061a1e719d12 Extracting [=================================>                 ]  132.6MB/195.8MB
 fe4b54c62f54 Extracting [================================>                  ]  130.4MB/199.9MB
 061a1e719d12 Extracting [==================================>                ]  133.1MB/195.8MB
 fe4b54c62f54 Extracting [================================>                  ]  131.5MB/199.9MB
 061a1e719d12 Extracting [==================================>                ]  133.7MB/195.8MB
 fe4b54c62f54 Extracting [=================================>                 ]    132MB/199.9MB
 061a1e719d12 Extracting [==================================>                ]  134.3MB/195.8MB
 fe4b54c62f54 Extracting [=================================>                 ]  132.6MB/199.9MB
 fe4b54c62f54 Extracting [=================================>                 ]  133.1MB/199.9MB
 061a1e719d12 Extracting [==================================>                ]  134.8MB/195.8MB
 fe4b54c62f54 Extracting [=================================>                 ]  133.7MB/199.9MB
 061a1e719d12 Extracting [==================================>                ]  135.4MB/195.8MB
 fe4b54c62f54 Extracting [=================================>                 ]  134.3MB/199.9MB
 061a1e719d12 Extracting [==================================>                ]  135.9MB/195.8MB
 fe4b54c62f54 Extracting [=================================>                 ]  135.4MB/199.9MB
 061a1e719d12 Extracting [==================================>                ]  136.5MB/195.8MB
 fe4b54c62f54 Extracting [==================================>                ]    137MB/199.9MB
 061a1e719d12 Extracting [===================================>               ]    137MB/195.8MB
 fe4b54c62f54 Extracting [==================================>                ]  137.6MB/199.9MB
 fe4b54c62f54 Extracting [==================================>                ]  138.7MB/199.9MB
 061a1e719d12 Extracting [===================================>               ]  138.7MB/195.8MB
 061a1e719d12 Extracting [===================================>               ]  139.3MB/195.8MB
 fe4b54c62f54 Extracting [==================================>                ]  139.3MB/199.9MB
 061a1e719d12 Extracting [===================================>               ]  140.9MB/195.8MB
 fe4b54c62f54 Extracting [===================================>               ]  140.4MB/199.9MB
 061a1e719d12 Extracting [====================================>              ]  142.6MB/195.8MB
 fe4b54c62f54 Extracting [===================================>               ]  141.5MB/199.9MB
 061a1e719d12 Extracting [====================================>              ]  144.8MB/195.8MB
 fe4b54c62f54 Extracting [====================================>              ]  144.3MB/199.9MB
 061a1e719d12 Extracting [=====================================>             ]  147.1MB/195.8MB
 061a1e719d12 Extracting [=====================================>             ]  147.6MB/195.8MB
 061a1e719d12 Extracting [=====================================>             ]  148.2MB/195.8MB
 fe4b54c62f54 Extracting [====================================>              ]  145.9MB/199.9MB
 061a1e719d12 Extracting [=====================================>             ]  148.7MB/195.8MB
 fe4b54c62f54 Extracting [====================================>              ]  146.5MB/199.9MB
 061a1e719d12 Extracting [======================================>            ]  149.8MB/195.8MB
 fe4b54c62f54 Extracting [=====================================>             ]  148.2MB/199.9MB
 fe4b54c62f54 Extracting [=====================================>             ]  148.7MB/199.9MB
 061a1e719d12 Extracting [======================================>            ]    151MB/195.8MB
 fe4b54c62f54 Extracting [=====================================>             ]  149.3MB/199.9MB
 fe4b54c62f54 Extracting [=====================================>             ]  149.8MB/199.9MB
 061a1e719d12 Extracting [======================================>            ]  151.5MB/195.8MB
 061a1e719d12 Extracting [======================================>            ]  152.1MB/195.8MB
 fe4b54c62f54 Extracting [=====================================>             ]    151MB/199.9MB
 061a1e719d12 Extracting [=======================================>           ]  153.2MB/195.8MB
 fe4b54c62f54 Extracting [======================================>            ]  152.1MB/199.9MB
 061a1e719d12 Extracting [=======================================>           ]  154.9MB/195.8MB
 fe4b54c62f54 Extracting [======================================>            ]  153.2MB/199.9MB
 061a1e719d12 Extracting [=======================================>           ]    156MB/195.8MB
 fe4b54c62f54 Extracting [======================================>            ]  153.7MB/199.9MB
 061a1e719d12 Extracting [========================================>          ]  157.1MB/195.8MB
 fe4b54c62f54 Extracting [======================================>            ]  154.9MB/199.9MB
 fe4b54c62f54 Extracting [======================================>            ]  155.4MB/199.9MB
 061a1e719d12 Extracting [========================================>          ]  158.2MB/195.8MB
 fe4b54c62f54 Extracting [=======================================>           ]  157.1MB/199.9MB
 061a1e719d12 Extracting [========================================>          ]  159.9MB/195.8MB
 fe4b54c62f54 Extracting [=======================================>           ]  158.8MB/199.9MB
 061a1e719d12 Extracting [=========================================>         ]  162.1MB/195.8MB
 fe4b54c62f54 Extracting [=======================================>           ]  159.9MB/199.9MB
 061a1e719d12 Extracting [=========================================>         ]  163.8MB/195.8MB
 fe4b54c62f54 Extracting [========================================>          ]  161.5MB/199.9MB
 061a1e719d12 Extracting [==========================================>        ]  165.4MB/195.8MB
 fe4b54c62f54 Extracting [========================================>          ]  162.1MB/199.9MB
 061a1e719d12 Extracting [==========================================>        ]  167.1MB/195.8MB
 fe4b54c62f54 Extracting [========================================>          ]  163.8MB/199.9MB
 061a1e719d12 Extracting [===========================================>       ]  169.3MB/195.8MB
 fe4b54c62f54 Extracting [=========================================>         ]    166MB/199.9MB
 061a1e719d12 Extracting [===========================================>       ]    171MB/195.8MB
 fe4b54c62f54 Extracting [=========================================>         ]  167.7MB/199.9MB
 061a1e719d12 Extracting [============================================>      ]  172.7MB/195.8MB
 fe4b54c62f54 Extracting [==========================================>        ]  168.8MB/199.9MB
 061a1e719d12 Extracting [============================================>      ]  174.4MB/195.8MB
 fe4b54c62f54 Extracting [==========================================>        ]  169.9MB/199.9MB
 061a1e719d12 Extracting [=============================================>     ]  176.6MB/195.8MB
 fe4b54c62f54 Extracting [==========================================>        ]  171.6MB/199.9MB
 061a1e719d12 Extracting [=============================================>     ]  177.7MB/195.8MB
 fe4b54c62f54 Extracting [===========================================>       ]  172.7MB/199.9MB
 061a1e719d12 Extracting [=============================================>     ]  178.3MB/195.8MB
 fe4b54c62f54 Extracting [===========================================>       ]  173.8MB/199.9MB
 061a1e719d12 Extracting [=============================================>     ]  179.4MB/195.8MB
 fe4b54c62f54 Extracting [===========================================>       ]  174.4MB/199.9MB
 fe4b54c62f54 Extracting [===========================================>       ]  174.9MB/199.9MB
 061a1e719d12 Extracting [=============================================>     ]  179.9MB/195.8MB
 fe4b54c62f54 Extracting [===========================================>       ]  175.5MB/199.9MB
 061a1e719d12 Extracting [==============================================>    ]  180.5MB/195.8MB
 fe4b54c62f54 Extracting [============================================>      ]    176MB/199.9MB
 fe4b54c62f54 Extracting [============================================>      ]  176.6MB/199.9MB
 061a1e719d12 Extracting [==============================================>    ]  181.6MB/195.8MB
 fe4b54c62f54 Extracting [============================================>      ]  177.1MB/199.9MB
 061a1e719d12 Extracting [==============================================>    ]  182.2MB/195.8MB
 061a1e719d12 Extracting [==============================================>    ]  182.7MB/195.8MB
 fe4b54c62f54 Extracting [============================================>      ]  177.7MB/199.9MB
 fe4b54c62f54 Extracting [============================================>      ]  178.3MB/199.9MB
 061a1e719d12 Extracting [==============================================>    ]  183.3MB/195.8MB
 061a1e719d12 Extracting [==============================================>    ]  183.8MB/195.8MB
 fe4b54c62f54 Extracting [============================================>      ]  179.4MB/199.9MB
 061a1e719d12 Extracting [===============================================>   ]  184.4MB/195.8MB
 fe4b54c62f54 Extracting [=============================================>     ]  179.9MB/199.9MB
 061a1e719d12 Extracting [===============================================>   ]  184.9MB/195.8MB
 fe4b54c62f54 Extracting [=============================================>     ]  180.5MB/199.9MB
 061a1e719d12 Extracting [===============================================>   ]  185.5MB/195.8MB
 fe4b54c62f54 Extracting [=============================================>     ]    181MB/199.9MB
 061a1e719d12 Extracting [===============================================>   ]  186.6MB/195.8MB
 fe4b54c62f54 Extracting [=============================================>     ]  182.2MB/199.9MB
 fe4b54c62f54 Extracting [=============================================>     ]  182.7MB/199.9MB
 061a1e719d12 Extracting [===============================================>   ]  187.2MB/195.8MB
 061a1e719d12 Extracting [===============================================>   ]  187.7MB/195.8MB
 fe4b54c62f54 Extracting [=============================================>     ]  183.3MB/199.9MB
 061a1e719d12 Extracting [================================================>  ]  188.8MB/195.8MB
 fe4b54c62f54 Extracting [==============================================>    ]  184.4MB/199.9MB
 fe4b54c62f54 Extracting [==============================================>    ]  184.9MB/199.9MB
 061a1e719d12 Extracting [================================================>  ]    190MB/195.8MB
 061a1e719d12 Extracting [================================================>  ]  190.5MB/195.8MB
 fe4b54c62f54 Extracting [==============================================>    ]  186.1MB/199.9MB
 061a1e719d12 Extracting [================================================>  ]  191.6MB/195.8MB
 fe4b54c62f54 Extracting [==============================================>    ]  186.6MB/199.9MB
 061a1e719d12 Extracting [=================================================> ]  192.7MB/195.8MB
 fe4b54c62f54 Extracting [==============================================>    ]  187.2MB/199.9MB
 061a1e719d12 Extracting [=================================================> ]  193.9MB/195.8MB
 fe4b54c62f54 Extracting [===============================================>   ]  188.3MB/199.9MB
 fe4b54c62f54 Extracting [===============================================>   ]  188.8MB/199.9MB
 061a1e719d12 Extracting [=================================================> ]    195MB/195.8MB
 061a1e719d12 Extracting [=================================================> ]  195.5MB/195.8MB
 061a1e719d12 Extracting [==================================================>]  195.8MB/195.8MB
 fe4b54c62f54 Extracting [===============================================>   ]  189.4MB/199.9MB
 fe4b54c62f54 Extracting [===============================================>   ]    190MB/199.9MB
 061a1e719d12 Pull complete 
 0c7ee8b59fc1 Extracting [==================================================>]  1.001kB/1.001kB
 0c7ee8b59fc1 Extracting [==================================================>]  1.001kB/1.001kB
 0c7ee8b59fc1 Pull complete 
 95b4572be167 Extracting [>                                                  ]  557.1kB/193MB
 fe4b54c62f54 Extracting [===============================================>   ]  190.5MB/199.9MB
 fe4b54c62f54 Extracting [===============================================>   ]  191.6MB/199.9MB
 fe4b54c62f54 Extracting [================================================>  ]  192.2MB/199.9MB
 95b4572be167 Extracting [>                                                  ]  2.228MB/193MB
 95b4572be167 Extracting [>                                                  ]  2.785MB/193MB
 fe4b54c62f54 Extracting [================================================>  ]  193.3MB/199.9MB
 95b4572be167 Extracting [>                                                  ]  3.342MB/193MB
 95b4572be167 Extracting [=>                                                 ]  3.899MB/193MB
 fe4b54c62f54 Extracting [================================================>  ]  193.9MB/199.9MB
 95b4572be167 Extracting [=>                                                 ]  4.456MB/193MB
 fe4b54c62f54 Extracting [================================================>  ]  194.4MB/199.9MB
 fe4b54c62f54 Extracting [================================================>  ]    195MB/199.9MB
 95b4572be167 Extracting [=>                                                 ]  5.014MB/193MB
 fe4b54c62f54 Extracting [================================================>  ]  195.5MB/199.9MB
 fe4b54c62f54 Extracting [=================================================> ]  196.1MB/199.9MB
 fe4b54c62f54 Extracting [=================================================> ]  196.6MB/199.9MB
 95b4572be167 Extracting [=>                                                 ]  5.571MB/193MB
 fe4b54c62f54 Extracting [=================================================> ]  197.2MB/199.9MB
 fe4b54c62f54 Extracting [=================================================> ]  198.9MB/199.9MB
 95b4572be167 Extracting [=>                                                 ]  7.242MB/193MB
 fe4b54c62f54 Extracting [==================================================>]  199.9MB/199.9MB
 95b4572be167 Extracting [==>                                                ]  8.356MB/193MB
 95b4572be167 Extracting [==>                                                ]  8.913MB/193MB
 95b4572be167 Extracting [==>                                                ]   9.47MB/193MB
 fe4b54c62f54 Pull complete 
 e7383e9e0535 Extracting [==============>                                    ]  32.77kB/113.8kB
 e7383e9e0535 Extracting [==================================================>]  113.8kB/113.8kB
 e7383e9e0535 Extracting [==================================================>]  113.8kB/113.8kB
 95b4572be167 Extracting [==>                                                ]  10.03MB/193MB
 e7383e9e0535 Pull complete 
 95b4572be167 Extracting [==>                                                ]  10.58MB/193MB
 69c5e1ac6383 Extracting [>                                                  ]  557.1kB/84.49MB
 95b4572be167 Extracting [===>                                               ]  12.26MB/193MB
 69c5e1ac6383 Extracting [=>                                                 ]  2.228MB/84.49MB
 95b4572be167 Extracting [===>                                               ]  13.93MB/193MB
 95b4572be167 Extracting [====>                                              ]   15.6MB/193MB
 69c5e1ac6383 Extracting [==>                                                ]  3.899MB/84.49MB
 69c5e1ac6383 Extracting [==>                                                ]  5.014MB/84.49MB
 95b4572be167 Extracting [====>                                              ]  16.71MB/193MB
 95b4572be167 Extracting [====>                                              ]  17.27MB/193MB
 69c5e1ac6383 Extracting [===>                                               ]  5.571MB/84.49MB
 69c5e1ac6383 Extracting [===>                                               ]  6.685MB/84.49MB
 95b4572be167 Extracting [====>                                              ]  18.38MB/193MB
 95b4572be167 Extracting [=====>                                             ]   19.5MB/193MB
 69c5e1ac6383 Extracting [====>                                              ]  7.799MB/84.49MB
 95b4572be167 Extracting [=====>                                             ]  20.61MB/193MB
 69c5e1ac6383 Extracting [=====>                                             ]  8.913MB/84.49MB
 95b4572be167 Extracting [=====>                                             ]  21.73MB/193MB
 69c5e1ac6383 Extracting [=====>                                             ]  10.03MB/84.49MB
 95b4572be167 Extracting [=====>                                             ]  22.84MB/193MB
 69c5e1ac6383 Extracting [======>                                            ]  10.58MB/84.49MB
 95b4572be167 Extracting [======>                                            ]  23.95MB/193MB
 69c5e1ac6383 Extracting [=======>                                           ]  12.26MB/84.49MB
 95b4572be167 Extracting [======>                                            ]  25.62MB/193MB
 69c5e1ac6383 Extracting [========>                                          ]  14.48MB/84.49MB
 95b4572be167 Extracting [=======>                                           ]  27.85MB/193MB
 69c5e1ac6383 Extracting [=========>                                         ]  16.15MB/84.49MB
 95b4572be167 Extracting [=======>                                           ]  29.52MB/193MB
 69c5e1ac6383 Extracting [==========>                                        ]  17.83MB/84.49MB
 95b4572be167 Extracting [=======>                                           ]  30.64MB/193MB
 69c5e1ac6383 Extracting [===========>                                       ]  18.94MB/84.49MB
 95b4572be167 Extracting [========>                                          ]  32.31MB/193MB
 69c5e1ac6383 Extracting [============>                                      ]  20.61MB/84.49MB
 95b4572be167 Extracting [========>                                          ]  34.54MB/193MB
 69c5e1ac6383 Extracting [============>                                      ]  21.73MB/84.49MB
 95b4572be167 Extracting [=========>                                         ]  35.65MB/193MB
 69c5e1ac6383 Extracting [=============>                                     ]   23.4MB/84.49MB
 95b4572be167 Extracting [=========>                                         ]  38.44MB/193MB
 69c5e1ac6383 Extracting [===============>                                   ]  26.18MB/84.49MB
 95b4572be167 Extracting [==========>                                        ]  41.22MB/193MB
 69c5e1ac6383 Extracting [================>                                  ]  28.41MB/84.49MB
 95b4572be167 Extracting [===========>                                       ]  43.45MB/193MB
 69c5e1ac6383 Extracting [==================>                                ]   31.2MB/84.49MB
 95b4572be167 Extracting [===========>                                       ]  46.24MB/193MB
 69c5e1ac6383 Extracting [===================>                               ]  33.42MB/84.49MB
 95b4572be167 Extracting [============>                                      ]  47.91MB/193MB
 69c5e1ac6383 Extracting [=====================>                             ]  35.65MB/84.49MB
 95b4572be167 Extracting [============>                                      ]  49.02MB/193MB
 69c5e1ac6383 Extracting [=====================>                             ]  36.21MB/84.49MB
 95b4572be167 Extracting [============>                                      ]  50.14MB/193MB
 69c5e1ac6383 Extracting [======================>                            ]  37.88MB/84.49MB
 69c5e1ac6383 Extracting [======================>                            ]  38.44MB/84.49MB
 95b4572be167 Extracting [=============>                                     ]  51.81MB/193MB
 95b4572be167 Extracting [=============>                                     ]  54.03MB/193MB
 69c5e1ac6383 Extracting [=======================>                           ]  40.11MB/84.49MB
 95b4572be167 Extracting [==============>                                    ]  55.71MB/193MB
 69c5e1ac6383 Extracting [========================>                          ]  41.78MB/84.49MB
 95b4572be167 Extracting [==============>                                    ]  57.38MB/193MB
 69c5e1ac6383 Extracting [=========================>                         ]  43.45MB/84.49MB
 95b4572be167 Extracting [===============>                                   ]  57.93MB/193MB
 69c5e1ac6383 Extracting [==========================>                        ]  44.56MB/84.49MB
 95b4572be167 Extracting [===============>                                   ]  59.05MB/193MB
 69c5e1ac6383 Extracting [===========================>                       ]  45.68MB/84.49MB
 95b4572be167 Extracting [===============>                                   ]  60.72MB/193MB
 69c5e1ac6383 Extracting [============================>                      ]  47.35MB/84.49MB
 95b4572be167 Extracting [================>                                  ]  61.83MB/193MB
 69c5e1ac6383 Extracting [============================>                      ]  48.46MB/84.49MB
 95b4572be167 Extracting [================>                                  ]   63.5MB/193MB
 95b4572be167 Extracting [================>                                  ]  64.62MB/193MB
 69c5e1ac6383 Extracting [=============================>                     ]  50.14MB/84.49MB
 95b4572be167 Extracting [=================>                                 ]  66.29MB/193MB
 69c5e1ac6383 Extracting [==============================>                    ]  51.81MB/84.49MB
 95b4572be167 Extracting [=================>                                 ]  67.96MB/193MB
 69c5e1ac6383 Extracting [===============================>                   ]  53.48MB/84.49MB
 95b4572be167 Extracting [==================>                                ]  69.63MB/193MB
 69c5e1ac6383 Extracting [================================>                  ]  55.15MB/84.49MB
 95b4572be167 Extracting [==================>                                ]  71.86MB/193MB
 69c5e1ac6383 Extracting [=================================>                 ]  57.38MB/84.49MB
 95b4572be167 Extracting [===================>                               ]  74.65MB/193MB
 69c5e1ac6383 Extracting [==================================>                ]  59.05MB/84.49MB
 95b4572be167 Extracting [===================>                               ]  76.32MB/193MB
 69c5e1ac6383 Extracting [===================================>               ]  60.16MB/84.49MB
 95b4572be167 Extracting [====================>                              ]  78.54MB/193MB
 69c5e1ac6383 Extracting [====================================>              ]  62.39MB/84.49MB
 95b4572be167 Extracting [====================>                              ]  80.77MB/193MB
 69c5e1ac6383 Extracting [=====================================>             ]  64.06MB/84.49MB
 95b4572be167 Extracting [=====================>                             ]  83.56MB/193MB
 69c5e1ac6383 Extracting [=======================================>           ]  66.85MB/84.49MB
 95b4572be167 Extracting [======================>                            ]  85.79MB/193MB
 69c5e1ac6383 Extracting [========================================>          ]  68.52MB/84.49MB
 95b4572be167 Extracting [======================>                            ]  88.01MB/193MB
 69c5e1ac6383 Extracting [=========================================>         ]  70.75MB/84.49MB
 95b4572be167 Extracting [=======================>                           ]   90.8MB/193MB
 69c5e1ac6383 Extracting [===========================================>       ]  74.09MB/84.49MB
 95b4572be167 Extracting [========================>                          ]  93.03MB/193MB
 69c5e1ac6383 Extracting [=============================================>     ]  76.32MB/84.49MB
 95b4572be167 Extracting [========================>                          ]  95.81MB/193MB
 69c5e1ac6383 Extracting [==============================================>    ]  78.54MB/84.49MB
 95b4572be167 Extracting [=========================>                         ]  97.48MB/193MB
 69c5e1ac6383 Extracting [===============================================>   ]  79.66MB/84.49MB
 95b4572be167 Extracting [=========================>                         ]  99.71MB/193MB
 69c5e1ac6383 Extracting [================================================>  ]  81.33MB/84.49MB
 95b4572be167 Extracting [==========================>                        ]  101.4MB/193MB
 69c5e1ac6383 Extracting [================================================>  ]  82.44MB/84.49MB
 95b4572be167 Extracting [==========================>                        ]  103.1MB/193MB
 69c5e1ac6383 Extracting [=================================================> ]  83.56MB/84.49MB
 95b4572be167 Extracting [===========================>                       ]  104.7MB/193MB
 69c5e1ac6383 Extracting [==================================================>]  84.49MB/84.49MB
 69c5e1ac6383 Pull complete 
 frontend Pulled 
 95b4572be167 Extracting [===========================>                       ]  105.8MB/193MB
 95b4572be167 Extracting [============================>                      ]  108.6MB/193MB
 95b4572be167 Extracting [=============================>                     ]  113.1MB/193MB
 95b4572be167 Extracting [==============================>                    ]    117MB/193MB
 95b4572be167 Extracting [===============================>                   ]  121.4MB/193MB
 95b4572be167 Extracting [================================>                  ]  124.2MB/193MB
 95b4572be167 Extracting [=================================>                 ]  128.7MB/193MB
 95b4572be167 Extracting [==================================>                ]  132.6MB/193MB
 95b4572be167 Extracting [===================================>               ]  136.5MB/193MB
 95b4572be167 Extracting [====================================>              ]  139.8MB/193MB
 95b4572be167 Extracting [=====================================>             ]  144.3MB/193MB
 95b4572be167 Extracting [======================================>            ]  147.1MB/193MB
 95b4572be167 Extracting [======================================>            ]  148.7MB/193MB
 95b4572be167 Extracting [=======================================>           ]  152.1MB/193MB
 95b4572be167 Extracting [========================================>          ]    156MB/193MB
 95b4572be167 Extracting [=========================================>         ]  158.8MB/193MB
 95b4572be167 Extracting [=========================================>         ]    161MB/193MB
 95b4572be167 Extracting [==========================================>        ]  162.7MB/193MB
 95b4572be167 Extracting [==========================================>        ]  163.8MB/193MB
 95b4572be167 Extracting [==========================================>        ]  165.4MB/193MB
 95b4572be167 Extracting [===========================================>       ]  167.1MB/193MB
 95b4572be167 Extracting [===========================================>       ]  168.8MB/193MB
 95b4572be167 Extracting [============================================>      ]  169.9MB/193MB
 95b4572be167 Extracting [============================================>      ]  173.2MB/193MB
 95b4572be167 Extracting [=============================================>     ]  174.9MB/193MB
 95b4572be167 Extracting [=============================================>     ]  176.6MB/193MB
 95b4572be167 Extracting [==============================================>    ]  178.8MB/193MB
 95b4572be167 Extracting [===============================================>   ]  181.6MB/193MB
 95b4572be167 Extracting [===============================================>   ]  183.3MB/193MB
 95b4572be167 Extracting [===============================================>   ]  183.8MB/193MB
 95b4572be167 Extracting [================================================>  ]  185.5MB/193MB
 95b4572be167 Extracting [================================================>  ]  188.3MB/193MB
 95b4572be167 Extracting [=================================================> ]  191.1MB/193MB
 95b4572be167 Extracting [=================================================> ]  192.2MB/193MB
 95b4572be167 Extracting [==================================================>]    193MB/193MB
 95b4572be167 Pull complete 
 817ab3828829 Extracting [======================>                            ]  32.77kB/73.75kB
 817ab3828829 Extracting [==================================================>]  73.75kB/73.75kB
 817ab3828829 Extracting [==================================================>]  73.75kB/73.75kB
 817ab3828829 Pull complete 
 3f2a33a1bf32 Extracting [==================================================>]     377B/377B
 3f2a33a1bf32 Extracting [==================================================>]     377B/377B
 3f2a33a1bf32 Pull complete 
 599c6223c326 Extracting [==================================================>]     149B/149B
 599c6223c326 Extracting [==================================================>]     149B/149B
 599c6223c326 Pull complete 
 backend Pulled 
 Network sistema_futebol_sistema-futebol  Creating
 Network sistema_futebol_sistema-futebol  Created
 Volume sistema_futebol_postgres_data  Creating
 Volume sistema_futebol_postgres_data  Created
 Container sistema_futebol_postgres  Creating
 Container sistema_futebol_postgres  Created
 Container sistema_futebol-backend-1  Creating
 Container sistema_futebol-backend-1  Created
 Container sistema_futebol-frontend-1  Creating
 Container sistema_futebol-frontend-1  Created
 Container sistema_futebol_postgres  Starting
Error response from daemon: failed to set up container networking: driver failed programming external connectivity on endpoint sistema_futebol_postgres (e265e01247948e6e835c821bd9b18b9b210db6b6026540e2f4879d0a3542f281): failed to bind host port for 0.0.0.0:5432:172.18.0.2:5432/tcp: address already in use
2025/10/20 13:27:27 Process exited with status 1
Error: Process completed with exit code 1.