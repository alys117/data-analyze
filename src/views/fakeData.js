export const fakeData = {
  'dw_mobilewire_user_statu_ds': {
    '表名': 'dw_mobilewire_user_statu_ds',
    '关联关系': '[{"关联名称":"地市编码","表名":"dw_mobilewire_user_statu_ds","关联表名":"dim_pub_city","关联关系":"dw_mobilewire_user_statu_ds.CITY_ID=dim_pub_city.city_id"},{"关联名称":"用户编码","表名":"dw_mobilewire_user_statu_ds","关联表名":"dw_mobilewire_acct_ms","关联关系":"dw_mobilewire_user_statu_ds.user_id=dw_mobilewire_acct_ms.user_id"},{"关联名称":"渠道编码","表名":"dw_mobilewire_user_statu_ds","关联表名":"ods_channel_msg_ds_monitor","关联关系":"dw_mobilewire_user_statu_ds.RECORGID=ods_channel_msg_ds_monitor.CHANNEL_ID"},{"关联名称":"小区编码","表名":"dw_mobilewire_user_statu_ds","关联表名":"ODS_NETM_ZONE_DS","关联关系":"dw_mobilewire_user_statu_ds.zone_id=ODS_NETM_ZONE_DS.ZONE_ID"},{"关联名称":"用户编码","表名":"dw_mobilewire_user_statu_ds","关联表名":"dw_product_dt","关联关系":"dw_mobilewire_user_statu_ds.user_id=dw_product_dt.user_id"},{"关联名称":"房号编码","表名":"dw_mobilewire_user_statu_ds","关联表名":"ods_netm_house_ds","关联关系":"dw_mobilewire_user_statu_ds.room_id=ods_netm_house_ds.room_id"}]',
    '所需字段': {
      'op_time': '数据日期',
      'cust_id': '客户编码',
      'user_id': '用户编码',
      'product_no': '号码',
      'city_id': '安装地市ID',
      'county_id': '安装区县ID',
      'serv_flag': '用户状态',
      'cover_types': '覆盖类型',
      'bandwidth': '带宽',
      'plan_type': '融合标识',
      'priv_flag': '资费标识',
      'crc_property': '产品标识',
      'group_flag': '是否聚类宽带',
      'xf_flag': '续费标识',
      'school_flag': '校园标识',
      'coveragetype': '覆盖类型',
      'rh_flag': '融合标识'
    },
    '样例数据': [
      {
        'op_time': '2024-06-03 00:00:00',
        'cust_id': '5368008070770',
        'user_id': '5368008188500',
        'product_no': '17852603260',
        'priv_user_id': '5368008070770',
        'priv_product_no': '17852603260',
        'date_stamp': '20240604',
        'start_date': '2017-10-02 18:10:00',
        'end_date': '2023-07-01 00:00:00',
        'l_city_id': '6',
        'l_county_id': '2',
        'serv_flag': '9',
        'cowlan_flag': '0',
        'room_id': 'nan',
        'cover_types': 'nan',
        'city_id': '6',
        'county_id': '2',
        'town_id': 'nan',
        'grid_id': 'nan',
        'road_id': '-1662683162.0',
        'zone_id': '-1662680021.0',
        'building_id': '-367310297.0',
        'unit_id': '-367310398.0',
        'floor_id': '-367310995.0',
        'zonetype_id': '2',
        'plan_type': '1',
        'priv_flag': '3',
        'privsetid': 'gl.base.798600_new.999',
        'crc_property': '0',
        'bandwidth': '100',
        'group_flag': '0',
        'priv_btime': '2017-11-01 00:00:00',
        'priv_etime': '2023-05-04 16:03:50',
        'act_privid': 'gl.base.kdnsuaxy.500',
        'act_btime': '2017-11-01 00:00:00',
        'act_etime': '2023-05-04 16:03:50',
        'months_all': '0',
        'apply_id': '88647914116620',
        'RECDATE': '2017-10-02 17:38:21',
        'RECORGID': 'SD.LF.01.01.a1.03',
        'RECOPID': 'f11a1109',
        'RECACCESSTYPE': 'basacHal',
        'note': '李飞',
        'town_unit_id': '0',
        'agent_id': '0',
        'xf_flag': '1',
        'xf_priv_id': 'gl.bass.929062.500',
        'xf_band_width': '100',
        'xf_priv_btime': '2023-05-01 00:00:00',
        'xf_channel_id': 'SD.LF',
        'xf_recdate': '2023-04-01 16:06:00',
        'xf_expire_days': '0',
        'expire_days': '-999',
        'school_flag': '1',
        'bandwidth_net': '300',
        'start_date_serv': '2021-10-10 14:13:23',
        'coveragetype': '校园场景',
        'rh_flag': '0',
        'sc_user_id': '6310863055678',
        'merchant_name': '沙县小吃'
      },
      {
        'op_time': '2024-06-03 00:00:00',
        'cust_id': '5368008070771',
        'user_id': '5368008188501',
        'product_no': '17852603261',
        'priv_user_id': '5368008070771',
        'priv_product_no': '17852603261',
        'date_stamp': '20240604',
        'start_date': '2017-05-04 16:03:00',
        'end_date': '2023-05-04 16:03:50',
        'l_city_id': '7',
        'l_county_id': '12',
        'serv_flag': '9',
        'cowlan_flag': '0',
        'room_id': '-629784691.0',
        'cover_types': 'FTTH',
        'city_id': '7',
        'county_id': '12',
        'town_id': '1112173867.0',
        'grid_id': 'SD.LG.Ob.0062.0002',
        'road_id': 'nan',
        'zone_id': 'nan',
        'building_id': 'nan',
        'unit_id': 'nan',
        'floor_id': 'nan',
        'zonetype_id': '3',
        'plan_type': '3',
        'priv_flag': '3',
        'privsetid': 'PRIV20210609161.999',
        'crc_property': '0',
        'bandwidth': '300',
        'group_flag': '0',
        'priv_btime': '2023-04-23 11:04:44',
        'priv_etime': '2023-06-27 17:23:17',
        'act_privid': 'nan',
        'act_btime': '2023-04-23 11:04:44',
        'act_etime': '2023-06-27 17:23:17',
        'months_all': '0',
        'apply_id': '88647914116621',
        'RECDATE': '2017-06-13 08:23:34',
        'RECORGID': 'SD.LG.Ob.13.03',
        'RECOPID': 'gb303008',
        'RECACCESSTYPE': 'basacHal',
        'note': '张三',
        'town_unit_id': 'SD.LG.Ob.0067',
        'agent_id': 'SD.LG.Ob.02.44.vb',
        'xf_flag': '0',
        'xf_priv_id': 'nan',
        'xf_band_width': '0',
        'xf_priv_btime': 'NaT',
        'xf_channel_id': 'nan',
        'xf_recdate': 'NaT',
        'xf_expire_days': '0',
        'expire_days': '-999',
        'school_flag': '0',
        'bandwidth_net': '50',
        'start_date_serv': '2023-09-01 09:05:12',
        'coveragetype': '家庭场景',
        'rh_flag': '0',
        'sc_user_id': '6310863055679',
        'merchant_name': '潍坊肉火烧'
      },
      {
        'op_time': '2024-06-03 00:00:00',
        'cust_id': '5368008070772',
        'user_id': '5368008188502',
        'product_no': '17852603262',
        'priv_user_id': '5368008070772',
        'priv_product_no': '17852603262',
        'date_stamp': '20240604',
        'start_date': '2018-07-01 00:00:00',
        'end_date': '2023-06-27 17:23:17',
        'l_city_id': '1',
        'l_county_id': '14',
        'serv_flag': '9',
        'cowlan_flag': '0',
        'room_id': 'nan',
        'cover_types': 'nan',
        'city_id': '1',
        'county_id': '14',
        'town_id': 'nan',
        'grid_id': 'nan',
        'road_id': 'nan',
        'zone_id': 'nan',
        'building_id': 'nan',
        'unit_id': 'nan',
        'floor_id': 'nan',
        'zonetype_id': '4',
        'plan_type': '3',
        'priv_flag': '3',
        'privsetid': 'gl.base.797135_128_new.505',
        'crc_property': '0',
        'bandwidth': '1000',
        'group_flag': '0',
        'priv_btime': '2020-09-01 00:00:00',
        'priv_etime': '2024-09-01 00:00:00',
        'act_privid': 'gl.base.kdnsuaxy.500',
        'act_btime': '2020-09-01 00:00:00',
        'act_etime': '2024-09-01 00:00:00',
        'months_all': '1',
        'apply_id': '88647914116622',
        'RECDATE': '2018-05-23 17:51:21',
        'RECORGID': 'SD.LA.Oc.02.AA.OP.TT',
        'RECOPID': 'ac2ar087',
        'RECACCESSTYPE': 'bsacAgt',
        'note': '王五',
        'town_unit_id': '0',
        'agent_id': '0',
        'xf_flag': '0',
        'xf_priv_id': 'nan',
        'xf_band_width': '0',
        'xf_priv_btime': 'NaT',
        'xf_channel_id': 'nan',
        'xf_recdate': 'NaT',
        'xf_expire_days': '0',
        'expire_days': '-999',
        'school_flag': '1',
        'bandwidth_net': '300',
        'start_date_serv': '2023-03-11 13:59:46',
        'coveragetype': '校园场景',
        'rh_flag': '0',
        'sc_user_id': '6310863055680',
        'merchant_name': '13526784532'
      },
      {
        'op_time': '2024-06-03 00:00:00',
        'cust_id': '5368008070773',
        'user_id': '5368008188503',
        'product_no': '17852603263',
        'priv_user_id': '5368008070773',
        'priv_product_no': '17852603263',
        'date_stamp': '20240604',
        'start_date': '2019-10-01 18:03:00',
        'end_date': '2022-10-14 09:07:23',
        'l_city_id': '6',
        'l_county_id': '10',
        'serv_flag': '9',
        'cowlan_flag': '0',
        'room_id': '367426882.0',
        'cover_types': 'nan',
        'city_id': '6',
        'county_id': '10',
        'town_id': 'nan',
        'grid_id': 'SD.LG.Ob.0062.1526',
        'road_id': '-2731526179.0',
        'zone_id': '-2731525261.0',
        'building_id': '-367310956.0',
        'unit_id': '-367310906.0',
        'floor_id': '-367310856.0',
        'zonetype_id': '5',
        'plan_type': '3',
        'priv_flag': '3',
        'privsetid': 'PRIV20210609161.999',
        'crc_property': '0',
        'bandwidth': '300',
        'group_flag': '0',
        'priv_btime': '2016-03-18 00:00:00',
        'priv_etime': '2025-10-01 00:00:00',
        'act_privid': 'gl.base.kdnsuaxy.501',
        'act_btime': '2016-03-18 00:00:00',
        'act_etime': '2025-10-01 00:00:00',
        'months_all': '0',
        'apply_id': '88647914116623',
        'RECDATE': '2019-09-30 15:44:43',
        'RECORGID': 'SD.LF.09.03.66.192',
        'RECOPID': 'f9255195',
        'RECACCESSTYPE': 'bsacAgt',
        'note': '外呼',
        'town_unit_id': '0',
        'agent_id': 'SD.LG.TT',
        'xf_flag': '1',
        'xf_priv_id': 'gl.bass.929062.347',
        'xf_band_width': '100',
        'xf_priv_btime': '2023-03-01 00:00:00',
        'xf_channel_id': 'SD.LF',
        'xf_recdate': '2023-02-28 14:25:08',
        'xf_expire_days': '119',
        'expire_days': '-999',
        'school_flag': '1',
        'bandwidth_net': '300',
        'start_date_serv': '2023-09-21 09:44:23',
        'coveragetype': '校园场景',
        'rh_flag': '0',
        'sc_user_id': '6310863055681',
        'merchant_name': '形象设计'
      },
      {
        'op_time': '2024-06-03 00:00:00',
        'cust_id': '5368008070774',
        'user_id': '5368008188504',
        'product_no': '17852603264',
        'priv_user_id': '5368008070774',
        'priv_product_no': '17852603264',
        'date_stamp': '20240604',
        'start_date': '2021-10-01 00:00:00',
        'end_date': '2023-10-25 16:52:52',
        'l_city_id': '9',
        'l_county_id': '2',
        'serv_flag': '9',
        'cowlan_flag': '0',
        'room_id': 'nan',
        'cover_types': 'nan',
        'city_id': '9',
        'county_id': '2',
        'town_id': 'nan',
        'grid_id': 'nan',
        'road_id': 'nan',
        'zone_id': 'nan',
        'building_id': 'nan',
        'unit_id': 'nan',
        'floor_id': 'nan',
        'zonetype_id': '6',
        'plan_type': '3',
        'priv_flag': '3',
        'privsetid': 'PRIV20210609161.999',
        'crc_property': '0',
        'bandwidth': '200',
        'group_flag': '0',
        'priv_btime': '2021-10-01 00:00:00',
        'priv_etime': '2023-10-25 16:52:52',
        'act_privid': 'gl.base.kdnsuaxy.502',
        'act_btime': '2021-10-01 00:00:00',
        'act_etime': '2023-10-25 16:52:52',
        'months_all': '0',
        'apply_id': '88647914116625',
        'RECDATE': '2021-09-06 10:30:21',
        'RECORGID': 'SD.LI.01.01.09',
        'RECOPID': 'i1190067',
        'RECACCESSTYPE': 'basacHal',
        'note': '外呼',
        'town_unit_id': 'SD.LG.Ob.0082',
        'agent_id': '0',
        'xf_flag': '0',
        'xf_priv_id': 'nan',
        'xf_band_width': '0',
        'xf_priv_btime': 'NaT',
        'xf_channel_id': 'nan',
        'xf_recdate': 'NaT',
        'xf_expire_days': '0',
        'expire_days': '-999',
        'school_flag': '0',
        'bandwidth_net': '100',
        'start_date_serv': '2020-09-21 09:34:12',
        'coveragetype': '家庭场景',
        'rh_flag': '0',
        'sc_user_id': '6310863055682',
        'merchant_name': 'PENG'
      }
    ],
    '表的所有字段': {
      'op_time': '数据日期',
      'cust_id': '客户编码',
      'user_id': '用户编码',
      'product_no': '号码',
      'priv_user_id': '主用户编码',
      'priv_product_no': '主用户号码',
      'date_stamp': '时间戳',
      'start_date': '服务开通时间',
      'end_date': '服务结束时间',
      'l_city_id': '工作省份',
      'l_county_id': '资料归属区县ID',
      'serv_flag': '用户状态',
      'cowlan_flag': '他网标识',
      'room_id': '房号ID',
      'cover_types': '覆盖类型',
      'city_id': '安装地市ID',
      'county_id': '安装区县ID',
      'town_id': '乡镇ID',
      'grid_id': '网格ID',
      'road_id': '街道ID',
      'zone_id': '小区ID',
      'building_id': '建筑物id',
      'unit_id': '单元ID',
      'floor_id': '楼层ID',
      'zonetype_id': '区域类型编码',
      'plan_type': '融合标识',
      'priv_flag': '资费标识',
      'privsetid': '资费编码',
      'crc_property': '产品标识',
      'bandwidth': '带宽',
      'group_flag': '是否聚类宽带',
      'priv_btime': '资费生效时间',
      'priv_etime': '资费失效时间',
      'act_privid': '预存优惠编码',
      'act_btime': '预存优惠生效时间',
      'act_etime': '预存优惠失效时间',
      'months_all': '全月份',
      'apply_id': '服务订购流水ID',
      'RECDATE': '重新归类',
      'RECORGID': '受理渠道',
      'RECOPID': '受理操作工号',
      'RECACCESSTYPE': '接入类型',
      'note': '受理备注',
      'town_unit_id': '乡镇编码',
      'agent_id': '代理商渠道编码',
      'xf_flag': '续费标识',
      'xf_priv_id': '续费编码',
      'xf_band_width': '续费带宽',
      'xf_priv_btime': '续费生效时间',
      'xf_channel_id': '续费渠道',
      'xf_recdate': '续费受理时间',
      'xf_expire_days': '续费到期开数',
      'expire_days': '预存到期天数(已经到期的预存)',
      'school_flag': '校园标识',
      'bandwidth_net': '带宽-网络部老口径',
      'start_date_serv': '服务开通时间',
      'coveragetype': '覆盖类型',
      'rh_flag': '融合标识',
      'sc_user_id': '高校宽带对应虚拟号',
      'merchant_name': '名字'
    }
  },
  'dim_pub_city': {
    '表名': 'dim_pub_city',
    '关联关系': '[{"关联名称":"地市编码","表名":"dim_pub_city","关联表名":"dw_mobilewire_user_statu_ds","关联关系":"dim_pub_city.CITY_ID=dw_mobilewire_user_statu_ds.city_id"},{"关联名称":"地市编码","表名":"dim_pub_city","关联表名":"dw_mobilewire_acct_ms","关联关系":"dim_pub_city.CITY_ID=dw_mobilewire_acct_ms.CITY_ID"},{"关联名称":"地市编码","表名":"dim_pub_city","关联表名":"ods_channel_msg_ds_monitor","关联关系":"dim_pub_city.CITY_ID=ods_channel_msg_ds_monitor.CITY_ID"},{"关联名称":"地市编码","表名":"dim_pub_city","关联表名":"ODS_NETM_ZONE_DS","关联关系":"dim_pub_city.CITY_ID=ODS_NETM_ZONE_DS.CITY_ID"},{"关联名称":"地市编码","表名":"dim_pub_city","关联表名":"dw_product_dt","关联关系":"dim_pub_city.CITY_ID=dw_product_dt.CITY_ID"},{"关联名称":"地市编码","表名":"dim_pub_city","关联表名":"ods_netm_house_ds","关联关系":"dim_pub_city.CITY_ID=ods_netm_house_ds.CITY_ID"}]',
    '所需字段': {
      'CITY_NAME': '通话地市名称',
      'CITY_ID': '集团所属城市'
    },
    '样例数据': [
      {
        'ACTIVE_FLAG': '1',
        'AREA_CODE': '531',
        'BEGIN_TIME': '2003-01-01 00:00:00',
        'CITY_ID': '1',
        'CITY_NAME': '济南',
        'DESC_r': '济南',
        'END_TIME': '2010-01-01 00:00:00',
        'PROVINCE_ID': '1'
      },
      {
        'ACTIVE_FLAG': '1',
        'AREA_CODE': '532',
        'BEGIN_TIME': '2003-01-01 00:00:00',
        'CITY_ID': '2',
        'CITY_NAME': '青岛',
        'DESC_r': '青岛',
        'END_TIME': '2010-01-01 00:00:00',
        'PROVINCE_ID': '1'
      },
      {
        'ACTIVE_FLAG': '1',
        'AREA_CODE': '533',
        'BEGIN_TIME': '2003-01-01 00:00:00',
        'CITY_ID': '3',
        'CITY_NAME': '淄博',
        'DESC_r': '淄博',
        'END_TIME': '2010-01-01 00:00:00',
        'PROVINCE_ID': '1'
      },
      {
        'ACTIVE_FLAG': '1',
        'AREA_CODE': '534',
        'BEGIN_TIME': '2003-01-01 00:00:00',
        'CITY_ID': '4',
        'CITY_NAME': '德州',
        'DESC_r': '德州',
        'END_TIME': '2010-01-01 00:00:00',
        'PROVINCE_ID': '1'
      },
      {
        'ACTIVE_FLAG': '1',
        'AREA_CODE': '535',
        'BEGIN_TIME': '2003-01-01 00:00:00',
        'CITY_ID': '5',
        'CITY_NAME': '烟台',
        'DESC_r': '烟台',
        'END_TIME': '2010-01-01 00:00:00',
        'PROVINCE_ID': '1'
      }
    ],
    '表的所有字段': {
      'ACTIVE_FLAG': '活动标识',
      'AREA_CODE': '编码',
      'BEGIN_TIME': '魔百和预存开始时间',
      'CITY_ID': '集团所属城市',
      'CITY_NAME': '通话地市名称',
      'DESC': '类别',
      'END_TIME': '魔百和预存结束时间',
      'PROVINCE_ID': '账单分发省'
    }
  },
  'dw_mobilewire_acct_ms': {
    '表名': 'dw_mobilewire_acct_ms',
    '关联关系': '[{"关联名称":"用户编码","表名":"dw_mobilewire_acct_ms","关联表名":"dw_mobilewire_user_statu_ds","关联关系":"dw_mobilewire_acct_ms.user_id=dw_mobilewire_user_statu_ds.user_id"},{"关联名称":"地市编码","表名":"dw_mobilewire_acct_ms","关联表名":"dim_pub_city","关联关系":"dw_mobilewire_acct_ms.CITY_ID=dim_pub_city.CITY_ID"},{"关联名称":"用户编码","表名":"dw_mobilewire_acct_ms","关联表名":"dw_product_dt","关联关系":"dw_mobilewire_acct_ms.user_id=dw_product_dt.user_id"}]',
    '所需字段': {
      'CITY_ID': '地市',
      'FACT_FEE': '宽带总收入',
      'FEE_ZD': '账单费用',
      'OP_TIME': '日期'
    },
    '样例数据': [
      {
        'CITY_ID': '4',
        'COUNTY_ID': '1001',
        'FACT_FEE': '35428',
        'FEE_RH': '35428',
        'FEE_ZD': '0',
        'OP_TIME': '2024-05-01 00:00:00',
        'USER_ID': '53480122251729'
      },
      {
        'CITY_ID': '1',
        'COUNTY_ID': '11',
        'FACT_FEE': '43379',
        'FEE_RH': '42379',
        'FEE_ZD': '1000',
        'OP_TIME': '2024-05-02 00:00:00',
        'USER_ID': '53480122251730'
      },
      {
        'CITY_ID': '8',
        'COUNTY_ID': '4',
        'FACT_FEE': '26397',
        'FEE_RH': '25374',
        'FEE_ZD': '1023',
        'OP_TIME': '2024-05-03 00:00:00',
        'USER_ID': '53480122251731'
      },
      {
        'CITY_ID': '9',
        'COUNTY_ID': '2',
        'FACT_FEE': '22103',
        'FEE_RH': '19273',
        'FEE_ZD': '2830',
        'OP_TIME': '2024-05-04 00:00:00',
        'USER_ID': '53480122251732'
      },
      {
        'CITY_ID': '12',
        'COUNTY_ID': '12',
        'FACT_FEE': '234',
        'FEE_RH': '234',
        'FEE_ZD': '0',
        'OP_TIME': '2024-05-05 00:00:00',
        'USER_ID': '53480122251733'
      }
    ],
    '表的所有字段': {
      'CITY_ID': '地市',
      'COUNTY_ID': '县区',
      'FACT_FEE': '宽带总收入',
      'FEE_RH': '融合费用',
      'FEE_ZD': '账单费用',
      'OP_TIME': '日期',
      'USER_ID': '用户编码'
    }
  }
}