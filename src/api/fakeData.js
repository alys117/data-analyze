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
    },
    '中文名': '宽带用户状态表'
  },
  'dim_pub_city': {
    '表名': 'dim_pub_city',
    '中文名': '地市维表',
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
    '中文名': '宽带用户状态表',
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

export const fakeData2 = {
  'dim_pub_city': {
    '表名': 'dim_pub_city',
    '关联关系': '[{"关联名称":"地市编码","表名":"dim_pub_city","关联表名":"dw_mobilewire_user_statu_ds","关联关系":"dim_pub_city.CITY_ID=dw_mobilewire_user_statu_ds.city_id"},{"关联名称":"地市编码","表名":"dim_pub_city","关联表名":"dw_mobilewire_acct_ms","关联关系":"dim_pub_city.CITY_ID=dw_mobilewire_acct_ms.CITY_ID"},{"关联名称":"地市编码","表名":"dim_pub_city","关联表名":"ods_channel_msg_ds_monitor","关联关系":"dim_pub_city.CITY_ID=ods_channel_msg_ds_monitor.CITY_ID"},{"关联名称":"地市编码","表名":"dim_pub_city","关联表名":"ODS_NETM_ZONE_DS","关联关系":"dim_pub_city.CITY_ID=ODS_NETM_ZONE_DS.CITY_ID"},{"关联名称":"地市编码","表名":"dim_pub_city","关联表名":"dw_product_dt","关联关系":"dim_pub_city.CITY_ID=dw_product_dt.CITY_ID"},{"关联名称":"地市编码","表名":"dim_pub_city","关联表名":"ods_netm_house_ds","关联关系":"dim_pub_city.CITY_ID=ods_netm_house_ds.CITY_ID"}]',
    '所需字段': {
      'CITY_ID': '集团所属城市',
      'CITY_NAME': '通话地市名称',
      'PROVINCE_ID': '账单分发省'
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
      'DESC_r': '类别',
      'END_TIME': '魔百和预存结束时间',
      'PROVINCE_ID': '账单分发省'
    },
    '中文名': '地市维表'
  },
  'dw_mobilewire_acct_ms': {
    '表名': 'dw_mobilewire_acct_ms',
    '关联关系': '[{"关联名称":"用户编码","表名":"dw_mobilewire_acct_ms","关联表名":"dw_mobilewire_user_statu_ds","关联关系":"dw_mobilewire_acct_ms.user_id=dw_mobilewire_user_statu_ds.user_id"},{"关联名称":"地市编码","表名":"dw_mobilewire_acct_ms","关联表名":"dim_pub_city","关联关系":"dw_mobilewire_acct_ms.CITY_ID=dim_pub_city.CITY_ID"},{"关联名称":"用户编码","表名":"dw_mobilewire_acct_ms","关联表名":"dw_product_dt","关联关系":"dw_mobilewire_acct_ms.user_id=dw_product_dt.user_id"}]',
    '所需字段': {
      'CITY_ID': '地市',
      'FACT_FEE': '宽带总收入',
      'FEE_RH': '融合费用',
      'FEE_ZD': '账单费用',
      'OP_TIME': '日期'
    },
    '样例数据': [
      {
        'CITY_ID': '1',
        'COUNTY_ID': '11',
        'FACT_FEE': '43379',
        'FEE_RH': '43379',
        'FEE_ZD': '1000',
        'OP_TIME': '2024-06-02',
        'USER_ID': '5.35E+13'
      },
      {
        'CITY_ID': '8',
        'COUNTY_ID': '4',
        'FACT_FEE': '26397',
        'FEE_RH': '26397',
        'FEE_ZD': '1023',
        'OP_TIME': '2024-06-03',
        'USER_ID': '5.35E+13'
      },
      {
        'CITY_ID': '9',
        'COUNTY_ID': '2',
        'FACT_FEE': '22103',
        'FEE_RH': '22103',
        'FEE_ZD': '2830',
        'OP_TIME': '2024-06-04',
        'USER_ID': '5.35E+13'
      },
      {
        'CITY_ID': '12',
        'COUNTY_ID': '12',
        'FACT_FEE': '234',
        'FEE_RH': '234',
        'FEE_ZD': '0',
        'OP_TIME': '2024-06-05',
        'USER_ID': '5.35E+13'
      },
      {
        'CITY_ID': '4',
        'COUNTY_ID': '1001',
        'FACT_FEE': '35428',
        'FEE_RH': '35428',
        'FEE_ZD': '0',
        'OP_TIME': '2024-06-01',
        'USER_ID': '5.35E+13'
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
    },
    '中文名': '有线宽带收入明细月表'
  },
  'dw_mobilewire_user_statu_ds': {
    '表名': 'dw_mobilewire_user_statu_ds',
    '关联关系': '[{"关联名称":"地市编码","表名":"dw_mobilewire_user_statu_ds","关联表名":"dim_pub_city","关联关系":"dw_mobilewire_user_statu_ds.CITY_ID=dim_pub_city.city_id"},{"关联名称":"用户编码","表名":"dw_mobilewire_user_statu_ds","关联表名":"dw_mobilewire_acct_ms","关联关系":"dw_mobilewire_user_statu_ds.user_id=dw_mobilewire_acct_ms.user_id"},{"关联名称":"渠道编码","表名":"dw_mobilewire_user_statu_ds","关联表名":"ods_channel_msg_ds_monitor","关联关系":"dw_mobilewire_user_statu_ds.RECORGID=ods_channel_msg_ds_monitor.CHANNEL_ID"},{"关联名称":"小区编码","表名":"dw_mobilewire_user_statu_ds","关联表名":"ODS_NETM_ZONE_DS","关联关系":"dw_mobilewire_user_statu_ds.zone_id=ODS_NETM_ZONE_DS.ZONE_ID"},{"关联名称":"用户编码","表名":"dw_mobilewire_user_statu_ds","关联表名":"dw_product_dt","关联关系":"dw_mobilewire_user_statu_ds.user_id=dw_product_dt.user_id"},{"关联名称":"房号编码","表名":"dw_mobilewire_user_statu_ds","关联表名":"ods_netm_house_ds","关联关系":"dw_mobilewire_user_statu_ds.room_id=ods_netm_house_ds.room_id"}]',
    '所需字段': {
      'op_time': '数据日期',
      'city_id': '安装地市ID',
      'serv_flag': '用户状态',
      'cover_types': '覆盖类型',
      'plan_type': '融合标识',
      'bandwidth': '带宽',
      'crc_property': '产品标识',
      'priv_flag': '资费标识',
      'privsetid': '资费编码',
      'months_all': '全月份',
      'apply_id': '服务订购流水ID',
      'RECORGID': '受理渠道',
      'RECOPID': '受理操作工号',
      'RECACCESSTYPE': '接入类型',
      'note': '受理备注',
      'town_unit_id': '乡镇编码',
      'agent_id': '代理商渠道编码',
      'xf_flag': '续费标识',
      'xf_band_width': '续费带宽',
      'xf_channel_id': '续费渠道',
      'xf_recdate': '续费受理时间',
      'expire_days': '预存到期天数(已经到期的预存)',
      'school_flag': '校园标识'
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
        'serv_flag': '0',
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
        'serv_flag': '1',
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
        'serv_flag': '2',
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
        'serv_flag': '3',
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
        'serv_flag': '0',
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
    },
    '中文名': '有线宽带统一用户视图表'
  }
}

export const fakeData3 = {
  'tmp_0408_migu_tousu': {
    '表名': 'tmp_0408_migu_tousu',
    '关联关系': '[]',
    '所需字段': {
      'month': '月份',
      'province': '省份',
      'product_name': '产品名称',
      'SR': '服务请求分类名称',
      'complaint_colume': '投诉量'
    },
    '样例数据': [
      {
        'month': '2023-12',
        'province': '江苏',
        'product_name': '咪咕视频',
        'SR': '增值业务→业务营销→咪咕视频→全局流转→办理规范→业务退订→全局流转',
        'complaint_colume': '4'
      },
      {
        'month': '2023-12',
        'province': '四川',
        'product_name': '咪咕视频',
        'SR': '增值业务→基础服务→咪咕视频→咪咕视频APP→功能使用→卡券无法使用→观影券',
        'complaint_colume': '3'
      },
      {
        'month': '2023-12',
        'province': '新疆',
        'product_name': '咪咕视频',
        'SR': '增值业务→业务营销→咪咕视频→咪视界（标准版）→费用质疑→对自动续费不满/取消不成功→全局流转',
        'complaint_colume': '1'
      },
      {
        'month': '2023-12',
        'province': '内蒙古',
        'product_name': '咪咕视频',
        'SR': '增值业务→业务营销→咪咕视频→咪咕视频APP→业务规则→无法参加相关活动→全局流转',
        'complaint_colume': '1'
      },
      {
        'month': '2023-12',
        'province': '浙江',
        'product_name': '咪咕视频',
        'SR': '增值业务→业务营销→咪咕视频→咪咕视频APP→费用质疑→取消业务后仍收费→全局流转',
        'complaint_colume': '8'
      }
    ],
    '表的所有字段': {
      'month': '月份',
      'province': '省份',
      'product_name': '产品名称',
      'SR': '服务请求分类名称',
      'complaint_colume': '投诉量'
    },
    '中文名': '咪咕视频投诉数据'
  },
  'tmp_not_found': {
    '表名': 'tmp_not_found',
    '关联关系': '[]',
    '所需字段': {
      'month': '月份',
      'province': '省份',
      'product_name': '产品名称',
      'SR': '服务请求分类名称',
      'complaint_colume': '投诉量'
    },
    '样例数据': [
      {
        'month': '2023-12',
        'province': '江苏',
        'product_name': '咪咕视频',
        'SR': '增值业务→业务营销→咪咕视频→全局流转→办理规范→业务退订→全局流转',
        'complaint_colume': '4'
      },
      {
        'month': '2023-12',
        'province': '四川',
        'product_name': '咪咕视频',
        'SR': '增值业务→基础服务→咪咕视频→咪咕视频APP→功能使用→卡券无法使用→观影券',
        'complaint_colume': '3'
      },
      {
        'month': '2023-12',
        'province': '新疆',
        'product_name': '咪咕视频',
        'SR': '增值业务→业务营销→咪咕视频→咪视界（标准版）→费用质疑→对自动续费不满/取消不成功→全局流转',
        'complaint_colume': '1'
      },
      {
        'month': '2023-12',
        'province': '内蒙古',
        'product_name': '咪咕视频',
        'SR': '增值业务→业务营销→咪咕视频→咪咕视频APP→业务规则→无法参加相关活动→全局流转',
        'complaint_colume': '1'
      },
      {
        'month': '2023-12',
        'province': '浙江',
        'product_name': '咪咕视频',
        'SR': '增值业务→业务营销→咪咕视频→咪咕视频APP→费用质疑→取消业务后仍收费→全局流转',
        'complaint_colume': '8'
      }
    ],
    '表的所有字段': {
      'month': '月份',
      'province': '省份',
      'product_name': '产品名称',
      'SR': '服务请求分类名称',
      'complaint_colume': '投诉量'
    },
    '中文名': '业务脑图不存在的表'
  },
  'tmp_0408_migu_operational_needs': {
    '表名': 'tmp_0408_migu_operational_needs',
    '关联关系': '[]',
    '所需字段': {
      'Req_ID': '需求编号',
      'Req_Title': '需求标题',
      'Req_Desc': '需求描述',
      'Company_Name': '公司名称',
      'Contact_Person': '联系人',
      'Contact_Phone': '联系人电话',
      'Contact_Email': '联系人邮箱',
      'Product': '具体产品',
      'Req_Category': '需求类别',
      'Severity_Level': '严重等级',
      'Suggested_Launch': '建议上线时间',
      'Planned_Launch': '计划上线/完成时间',
      'Req_Initiator': '需求提出方',
      'Req_Handler': '需求受理方',
      'Req_Status': '需求状态',
      'Submitted_Time': '提出时间',
      'Accepted_Time': '需求受理时间',
      'Handling_Duration': '需求受理时长',
      'Eval_Result': '评估结果',
      'Planned_Completion': '计划上线/完成时间',
      'Eval_Op': '评估意见',
      'Eval_Time': '评估时间',
      'Review_Time': '评审时间',
      'Actual_Launch': '实际上线/完成时间',
      'Launch_Time': '上线时间',
      'Acceptance_Result': '验收结果',
      'Sat_Eval': '满意度评价',
      'Comment': '意见',
      'Acceptance_Time': '验收时间'
    },
    '样例数据': [
      {
        'Req_ID': 'T0005000012',
        'Req_Title': '关于咪咕视频短视频区域的需求',
        'Req_Desc': '结合我省员工体验，发现咪咕视频短视频区域多为短剧，用户体验感较差，建议优化推荐算法，增加视频内容。',
        'Company_Name': '黑龙江',
        'Contact_Person': '王子?M',
        'Contact_Phone': '151****3789',
        'Contact_Email': 'w*********@hl.chinamobile.com',
        'Product': '咪咕视频',
        'Req_Category': '产品功能优化',
        'Severity_Level': '低',
        'Suggested_Launch': '2024-03-01',
        'Planned_Launch': '',
        'Req_Initiator': '黑龙江',
        'Req_Handler': '咪咕视讯',
        'Req_Status': '待评估',
        'Submitted_Time': '2024-01-31 20:39:12',
        'Accepted_Time': '2024-02-01 10:09:11',
        'Handling_Duration': '13小时29分钟',
        'Eval_Result': '',
        'Planned_Completion': '',
        'Eval_Op': '',
        'Eval_Time': '',
        'Review_Time': '',
        'Actual_Launch': '',
        'Launch_Time': '',
        'Acceptance_Result': '',
        'Sat_Eval': '',
        'Comment': '',
        'Acceptance_Time': ''
      },
      {
        'Req_ID': 'T0005000011',
        'Req_Title': '关于大小屏联动的需求',
        'Req_Desc': '结合我省一线员工调研体验反馈，建议咪咕视频会员产品在APP、电视端互通，烦请协助答复支撑。',
        'Company_Name': '黑龙江',
        'Contact_Person': '王子?M',
        'Contact_Phone': '151****3789',
        'Contact_Email': 'w*********@hl.chinamobile.com',
        'Product': '咪咕视频',
        'Req_Category': '运营支持',
        'Severity_Level': '中',
        'Suggested_Launch': '2024-02-05',
        'Planned_Launch': '',
        'Req_Initiator': '黑龙江',
        'Req_Handler': '咪咕视讯',
        'Req_Status': '待评估',
        'Submitted_Time': '2024-01-31 20:36:30',
        'Accepted_Time': '2024-02-01 10:08:33',
        'Handling_Duration': '13小时32分钟',
        'Eval_Result': '',
        'Planned_Completion': '',
        'Eval_Op': '',
        'Eval_Time': '',
        'Review_Time': '',
        'Actual_Launch': '',
        'Launch_Time': '',
        'Acceptance_Result': '',
        'Sat_Eval': '',
        'Comment': '',
        'Acceptance_Time': ''
      },
      {
        'Req_ID': 'T0005000010',
        'Req_Title': '关于专业公司客户端内销售产品的需求',
        'Req_Desc': '当前各省已与专业公司签署了客户端内销售代理协议，请尽快提供客户端内可推广点位（建议提供大曝光量的点位），并尽快推进产品上线推广流程',
        'Company_Name': '黑龙江',
        'Contact_Person': '王子?M',
        'Contact_Phone': '151****3789',
        'Contact_Email': 'w*********@hl.chinamobile.com',
        'Product': '咪咕视频',
        'Req_Category': '运营支持',
        'Severity_Level': '中',
        'Suggested_Launch': '2024/1/15',
        'Planned_Launch': '',
        'Req_Initiator': '黑龙江',
        'Req_Handler': '咪咕视讯',
        'Req_Status': '待评估',
        'Submitted_Time': '2024-01-10 16:02:44',
        'Accepted_Time': '2024-01-11 16:28:41',
        'Handling_Duration': '1天25分钟',
        'Eval_Result': '',
        'Planned_Completion': '',
        'Eval_Op': '',
        'Eval_Time': '',
        'Review_Time': '',
        'Actual_Launch': '',
        'Launch_Time': '',
        'Acceptance_Result': '',
        'Sat_Eval': '',
        'Comment': '',
        'Acceptance_Time': ''
      },
      {
        'Req_ID': 'T0005000009',
        'Req_Title': '关于申请咪咕视频裸眼3D、VR宣传物料的需求',
        'Req_Desc': '咪咕视频裸眼3D、VR为集团公司2023年培育型双清单发展产品，为了更好的推广以上两款产品，烦请协助提供相关物料，便于本省线上渠道宣传推广',
        'Company_Name': '黑龙江',
        'Contact_Person': '王子?M',
        'Contact_Phone': '151****3789',
        'Contact_Email': 'w*********@hl.chinamobile.com',
        'Product': '咪咕视频',
        'Req_Category': '方案/材料输出',
        'Severity_Level': '低',
        'Suggested_Launch': '2024-01-12',
        'Planned_Launch': '',
        'Req_Initiator': '黑龙江',
        'Req_Handler': '咪咕视讯',
        'Req_Status': '待评估',
        'Submitted_Time': '2024-01-10 16:00:28',
        'Accepted_Time': '2024-01-11 16:28:56',
        'Handling_Duration': '1天28分钟',
        'Eval_Result': '',
        'Planned_Completion': '',
        'Eval_Op': '',
        'Eval_Time': '',
        'Review_Time': '',
        'Actual_Launch': '',
        'Launch_Time': '',
        'Acceptance_Result': '',
        'Sat_Eval': '',
        'Comment': '',
        'Acceptance_Time': ''
      }
    ],
    '表的所有字段': {
      'Req_ID': '需求编号',
      'Req_Title': '需求标题',
      'Req_Desc': '需求描述',
      'Company_Name': '公司名称',
      'Contact_Person': '联系人',
      'Contact_Phone': '联系人电话',
      'Contact_Email': '联系人邮箱',
      'Product': '具体产品',
      'Req_Category': '需求类别',
      'Severity_Level': '严重等级',
      'Suggested_Launch': '建议上线时间',
      'Planned_Launch': '计划上线/完成时间',
      'Req_Initiator': '需求提出方',
      'Req_Handler': '需求受理方',
      'Req_Status': '需求状态',
      'Submitted_Time': '提出时间',
      'Accepted_Time': '需求受理时间',
      'Handling_Duration': '需求受理时长',
      'Eval_Result': '评估结果',
      'Planned_Completion': '计划上线/完成时间',
      'Eval_Op': '评估意见',
      'Eval_Time': '评估时间',
      'Review_Time': '评审时间',
      'Actual_Launch': '实际上线/完成时间',
      'Launch_Time': '上线时间',
      'Acceptance_Result': '验收结果',
      'Sat_Eval': '满意度评价',
      'Comment': '意见',
      'Acceptance_Time': '验收时间'
    },
    '中文名': '两级运营需求'
  },
  'tmp_0408_migu_tousu_reci': {
    '表名': 'tmp_0408_migu_tousu_reci',
    '关联关系': '[]',
    '所需字段': {
      'month': '月份',
      'province': '省份',
      'product_name': '产品名称',
      'SR': '服务请求分类名称',
      'hot_words': '热词',
      'frequency': '热词频次',
      'increase': '热词涨幅',
      'frequency_pro': '热词分省频次',
      'increase_pro': '热词分省涨幅'
    },
    '样例数据': [
      {
        'month': '2023-12',
        'province': '河北',
        'product_name': '咪咕视频',
        'SR': '增值业务→基础服务→咪咕视频→咪咕视频APP→功能使用→卡券无法使用→会员券',
        'hot_words': '咪咕视频权益领取不成功',
        'frequency': '1',
        'increase': '-66.67',
        'frequency_pro': '1',
        'increase_pro': '-66.67'
      },
      {
        'month': '2023-12',
        'province': '广东',
        'product_name': '咪咕视频',
        'SR': '增值业务→基础服务→咪咕视频→全局流转→功能使用→播放问题→全局流转',
        'hot_words': '咪咕视频无法进入播放界面',
        'frequency': '1',
        'increase': '0',
        'frequency_pro': '1',
        'increase_pro': '0'
      },
      {
        'month': '2023-12',
        'province': '河北',
        'product_name': '咪咕视频',
        'SR': '增值业务→业务营销→咪咕视频→咪咕视频APP→营销宣传→营销宣传有误/不明确→全局流转',
        'hot_words': '视频彩铃限制办理渠道',
        'frequency': '1',
        'increase': '0',
        'frequency_pro': '1',
        'increase_pro': '0'
      },
      {
        'month': '2023-12',
        'province': '贵州',
        'product_name': '咪咕视频',
        'SR': '增值业务→业务营销→咪咕视频→全局流转→办理规范→取消不成功→全局流转',
        'hot_words': '咪咕视频不知情办理',
        'frequency': '1',
        'increase': '-75',
        'frequency_pro': '1',
        'increase_pro': '-75'
      },
      {
        'month': '2023-12',
        'province': '河南',
        'product_name': '咪咕视频',
        'SR': '增值业务→业务营销→咪咕视频→全局流转→营销宣传→营销宣传有误/不明确→全局流转',
        'hot_words': '咪咕互娱不知情办理',
        'frequency': '9',
        'increase': '800',
        'frequency_pro': '9',
        'increase_pro': '800'
      }
    ],
    '表的所有字段': {
      'month': '月份',
      'province': '省份',
      'product_name': '产品名称',
      'SR': '服务请求分类名称',
      'hot_words': '热词',
      'frequency': '热词频次',
      'increase': '热词涨幅',
      'frequency_pro': '热词分省频次',
      'increase_pro': '热词分省涨幅'
    },
    '中文名': '咪咕视频投诉热词数'
  },
  'tmp_0408_migu_product_demand': {
    '表名': 'tmp_0408_migu_product_demand',
    '关联关系': '[]',
    '所需字段': {
      'Req_ID': '需求编号',
      'Req_Title': '需求标题',
      'Req_Desc': '需求描述',
      'Company_Name': '公司名称',
      'Contact_Person': '联系人',
      'Contact_Phone': '联系人电话',
      'Contact_Email': '联系人邮箱',
      'Product': '具体产品',
      'Product_Ver': '涉及产品版本',
      'Req_Category': '需求类别',
      'Feedback_Channel': '需求反馈渠道',
      'SeverityLevel': '严重等级',
      'Inv_Dim': '涉及维度',
      'Test_Metric': '拨测指标',
      'Test_Time': '拨测时间',
      'Req_Initiator': '需求提出方',
      'Req_Handler': '需求受理方',
      'Req_Status': '需求状态',
      'Submitted_Time': '提出时间',
      'Accepted_Time': '受理时间',
      'Handler': '受理人',
      'Eval_Op': '评估意见',
      'RQS': '需求质量得分',
      'Dev_Pri': '开发优先级',
      'Dec_Op': '决策意见',
      'Imp_Plan': '需求实现方案',
      'Rel_Ver': '发布版本',
      'Act_Launch': '实际上线时间',
      'Func_Ver_Desc': '功能验证说明',
      'Sat_Score': '满意度评价得分',
      'Eval_FB': '评价意见'
    },
    '样例数据': [
      {
        'Req_ID': 'R0007002566',
        'Req_Title': '“人物识别”功能',
        'Req_Desc': '测试日期：2023.8.21内容：咪咕视频“人物识别”功能，只能识别人物信息参演电影电视剧。对标爱奇异“奇观”功能，识别人物信息参演电影电视剧排版较咪咕视频更直观具象，另“奇观”功能可识别剧中歌曲，影视歌单剧中人物关系图，前情回顾，参与主题讨论等，更能凸显人性化，提高客户使用粘性，建议我们也能进行优化。附件：1-1至1-5',
        'Company_Name': '辽宁移动互联网中心(辽宁)',
        'Contact_Person': '刘昕蕊',
        'Contact_Phone': '159****3637',
        'Contact_Email': 'l********@ln.chinamobile.com',
        'Product': '咪咕视频',
        'Product_Ver': 'V6.1.5.60',
        'Req_Category': '优化建议',
        'Feedback_Channel': '一线业务人员',
        'SeverityLevel': '中',
        'Inv_Dim': '功能',
        'Test_Metric': '',
        'Test_Time': '2023-08-25 09:34:15',
        'Req_Initiator': '辽宁',
        'Req_Handler': '咪咕视讯',
        'Req_Status': '未采纳',
        'Submitted_Time': '2023-08-23 18:10:22',
        'Accepted_Time': '2023-08-25 09:34:15',
        'Handler': '唐伟峰(咪咕视讯-咪咕视讯)',
        'Eval_Op': '短期内无法实现',
        'RQS': '0.0',
        'Dev_Pri': '',
        'Dec_Op': '',
        'Imp_Plan': '',
        'Rel_Ver': '',
        'Act_Launch': '',
        'Func_Ver_Desc': '',
        'Sat_Score': '',
        'Eval_FB': ''
      },
      {
        'Req_ID': 'R0007002586',
        'Req_Title': '高能进度条',
        'Req_Desc': '测试日期：2023.9.9内容：咪咕视频“人物识别”功能，只能识别人物信息参演电影电视剧。对标爱奇异“奇观”功能，识别人物信息参演电影电视剧排版较咪咕视频更直观具象，另“奇观”功能可识别剧中歌曲，影视歌单剧中人物关系图，前情回顾，参与主题讨论等，更能凸显人性化，提高客户使用粘性，建议我们也能进行优化。附件：1-1',
        'Company_Name': '辽宁移动互联网中心(辽宁)',
        'Contact_Person': '刘昕蕊',
        'Contact_Phone': '159****3637',
        'Contact_Email': 'l********@ln.chinamobile.com',
        'Product': '咪咕视频',
        'Product_Ver': 'V6.1.5.60',
        'Req_Category': '优化建议',
        'Feedback_Channel': '一线业务人员',
        'SeverityLevel': '中',
        'Inv_Dim': '功能',
        'Test_Metric': '',
        'Test_Time': '2023-09-27 10:41:02',
        'Req_Initiator': '辽宁',
        'Req_Handler': '咪咕视讯',
        'Req_Status': '未采纳',
        'Submitted_Time': '2023-09-26 16:30:11',
        'Accepted_Time': '2023-09-27 10:41:02',
        'Handler': '唐伟峰(咪咕视讯-咪咕视讯)',
        'Eval_Op': '短期内无法实现',
        'RQS': '0.0',
        'Dev_Pri': '',
        'Dec_Op': '',
        'Imp_Plan': '',
        'Rel_Ver': '',
        'Act_Launch': '',
        'Func_Ver_Desc': '',
        'Sat_Score': '',
        'Eval_FB': ''
      },
      {
        'Req_ID': 'R0007002587',
        'Req_Title': '互动功能',
        'Req_Desc': '测试日期：2023.9.16内容：对标腾讯视频，建议添加“互动”功能，根据剧情在可参与互动情节设置互动，比如截图为主人公被“萋娘草”攻击，这时弹出互动，大家就可以“一起刀、一起火把”参与其中。附件：2-1、2-2',
        'Company_Name': '辽宁移动互联网中心(辽宁)',
        'Contact_Person': '刘昕蕊',
        'Contact_Phone': '159****3637',
        'Contact_Email': 'l********@ln.chinamobile.com',
        'Product': '咪咕视频',
        'Product_Ver': 'V6.1.5.60',
        'Req_Category': '优化建议',
        'Feedback_Channel': '一线业务人员',
        'SeverityLevel': '中',
        'Inv_Dim': '功能',
        'Test_Metric': '',
        'Test_Time': '2023-09-27 10:41:19',
        'Req_Initiator': '辽宁',
        'Req_Handler': '咪咕视讯',
        'Req_Status': '未采纳',
        'Submitted_Time': '2023-09-26 16:34:22',
        'Accepted_Time': '2023-09-27 10:41:19',
        'Handler': '唐伟峰(咪咕视讯-咪咕视讯)',
        'Eval_Op': '短期内无法实现',
        'RQS': '0.0',
        'Dev_Pri': '',
        'Dec_Op': '',
        'Imp_Plan': '',
        'Rel_Ver': '',
        'Act_Launch': '',
        'Func_Ver_Desc': '',
        'Sat_Score': '',
        'Eval_FB': ''
      },
      {
        'Req_ID': 'R0007002588',
        'Req_Title': '咪咕视频',
        'Req_Desc': '测试日期：2023.9.21内容：近期通过亚运会的召开，浏览的客户会照往期增多，以个人角度来看，会能新增和唤醒部分沉默客户，但因此活动具有时期性，活动之后如何增加客户粘性？通过体验“爱奇艺”客户端，在主页标题栏内有一项“知识”板块，里面体现了许多大众民主较为关注及感兴趣的课程（例如成年学习类），建议“咪咕视频”也拓展类似这种板块，进而当亚运会结束后，客户在此版块中也能促进客户长期使用率。附件：3-1、3-2',
        'Company_Name': '辽宁移动互联网中心(辽宁)',
        'Contact_Person': '刘昕蕊',
        'Contact_Phone': '159****3637',
        'Contact_Email': 'l********@ln.chinamobile.com',
        'Product': '咪咕视频',
        'Product_Ver': 'V6.1.7.00',
        'Req_Category': '优化建议',
        'Feedback_Channel': '一线业务人员',
        'SeverityLevel': '中',
        'Inv_Dim': '功能',
        'Test_Metric': '',
        'Test_Time': '2023-09-27 10:40:53',
        'Req_Initiator': '辽宁',
        'Req_Handler': '咪咕视讯',
        'Req_Status': '未采纳',
        'Submitted_Time': '2023-09-26 16:36:13',
        'Accepted_Time': '2023-09-27 10:40:53',
        'Handler': '唐伟峰(咪咕视讯-咪咕视讯)',
        'Eval_Op': '根据运营策略调整，暂不采纳',
        'RQS': '0.0',
        'Dev_Pri': '',
        'Dec_Op': '',
        'Imp_Plan': '',
        'Rel_Ver': '',
        'Act_Launch': '',
        'Func_Ver_Desc': '',
        'Sat_Score': '',
        'Eval_FB': ''
      },
      {
        'Req_ID': 'R0007002589',
        'Req_Title': '热卖功能，建议优化商品入口展示形式',
        'Req_Desc': '测试日期：2023.9.21内容：当前热卖功能页面展示入口不太明显，建议可以比照其他平台，放大购买商品入口。附件：4-1、4-2',
        'Company_Name': '辽宁移动互联网中心(辽宁)',
        'Contact_Person': '刘昕蕊',
        'Contact_Phone': '159****3637',
        'Contact_Email': 'l********@ln.chinamobile.com',
        'Product': '咪咕视频',
        'Product_Ver': 'V6.1.7.00',
        'Req_Category': '优化建议',
        'Feedback_Channel': '一线业务人员',
        'SeverityLevel': '中',
        'Inv_Dim': '界面',
        'Test_Metric': '',
        'Test_Time': '2023-09-27 10:39:08',
        'Req_Initiator': '辽宁',
        'Req_Handler': '咪咕视讯',
        'Req_Status': '未采纳',
        'Submitted_Time': '2023-09-26 16:37:57',
        'Accepted_Time': '2023-09-27 10:39:08',
        'Handler': '唐伟峰(咪咕视讯-咪咕视讯)',
        'Eval_Op': '设计如此，暂不采纳',
        'RQS': '0.0',
        'Dev_Pri': '',
        'Dec_Op': '',
        'Imp_Plan': '',
        'Rel_Ver': '',
        'Act_Launch': '',
        'Func_Ver_Desc': '',
        'Sat_Score': '',
        'Eval_FB': ''
      }
    ],
    '表的所有字段': {
      'Req_ID': '需求编号',
      'Req_Title': '需求标题',
      'Req_Desc': '需求描述',
      'Company_Name': '公司名称',
      'Contact_Person': '联系人',
      'Contact_Phone': '联系人电话',
      'Contact_Email': '联系人邮箱',
      'Product': '具体产品',
      'Product_Ver': '涉及产品版本',
      'Req_Category': '需求类别',
      'Feedback_Channel': '需求反馈渠道',
      'SeverityLevel': '严重等级',
      'Inv_Dim': '涉及维度',
      'Test_Metric': '拨测指标',
      'Test_Time': '拨测时间',
      'Req_Initiator': '需求提出方',
      'Req_Handler': '需求受理方',
      'Req_Status': '需求状态',
      'Submitted_Time': '提出时间',
      'Accepted_Time': '受理时间',
      'Handler': '受理人',
      'Eval_Op': '评估意见',
      'RQS': '需求质量得分',
      'Dev_Pri': '开发优先级',
      'Dec_Op': '决策意见',
      'Imp_Plan': '需求实现方案',
      'Rel_Ver': '发布版本',
      'Act_Launch': '实际上线时间',
      'Func_Ver_Desc': '功能验证说明',
      'Sat_Score': '满意度评价得分',
      'Eval_FB': '评价意见'
    },
    '中文名': '一二类产品需求'
  },
  'tmp_0408_migu_pioneer_research': {
    '表名': 'tmp_0408_migu_pioneer_research',
    '关联关系': '[]',
    '所需字段': {
      'op_time': '统计时间',
      'op_product_name': '产品名称',
      'satisfaction_loyalty': '满意度与忠诚度',
      'support': '性能',
      'ability': '功能',
      'interface': '界面',
      'service': '服务',
      'mamber': '会员',
      'run': '运行',
      'content': '内容',
      'type': '种类',
      'process': '流程',
      'repayment': '还款',
      'operation': '操作',
      'appearance': '外观',
      'quality': '质量',
      'total_score': '总分'
    },
    '样例数据': [
      {
        'op_time': '2023-08',
        'op_product_name': '咪咕视频',
        'satisfaction_loyalty': '76.32',
        'support': '82.75',
        'ability': '83.4',
        'interface': '82.8',
        'service': '',
        'mamber': '73.64',
        'run': '',
        'content': '81.46',
        'type': '',
        'process': '',
        'repayment': '',
        'operation': '',
        'appearance': '',
        'quality': '',
        'total_score': '79.01'
      },
      {
        'op_time': '2023-08',
        'op_product_name': '爱奇艺',
        'satisfaction_loyalty': '76.74',
        'support': '82.79',
        'ability': '83.94',
        'interface': '82.84',
        'service': '',
        'mamber': '67.11',
        'run': '',
        'content': '81.55',
        'type': '',
        'process': '',
        'repayment': '',
        'operation': '',
        'appearance': '',
        'quality': '',
        'total_score': '78.48'
      },
      {
        'op_time': '2023-08',
        'op_product_name': '腾讯视频',
        'satisfaction_loyalty': '76.1',
        'support': '84.27',
        'ability': '84.71',
        'interface': '82.93',
        'service': '',
        'mamber': '71.45',
        'run': '',
        'content': '81.86',
        'type': '',
        'process': '',
        'repayment': '',
        'operation': '',
        'appearance': '',
        'quality': '',
        'total_score': '79.06'
      },
      {
        'op_time': '2023-08',
        'op_product_name': '优酷视频',
        'satisfaction_loyalty': '77.74',
        'support': '84.38',
        'ability': '85.14',
        'interface': '84.03',
        'service': '',
        'mamber': '74.02',
        'run': '',
        'content': '82.7',
        'type': '',
        'process': '',
        'repayment': '',
        'operation': '',
        'appearance': '',
        'quality': '',
        'total_score': '80.33'
      },
      {
        'op_time': '2023-09',
        'op_product_name': '咪咕视频',
        'satisfaction_loyalty': '78.14',
        'support': '82.76',
        'ability': '83.08',
        'interface': '80.1',
        'service': '',
        'mamber': '77.58',
        'run': '',
        'content': '81.2',
        'type': '',
        'process': '',
        'repayment': '',
        'operation': '',
        'appearance': '',
        'quality': '',
        'total_score': '80.1'
      }
    ],
    '表的所有字段': {
      'op_time': '统计时间',
      'op_product_name': '产品名称',
      'satisfaction_loyalty': '满意度与忠诚度',
      'support': '性能',
      'ability': '功能',
      'interface': '界面',
      'service': '服务',
      'mamber': '会员',
      'run': '运行',
      'content': '内容',
      'type': '种类',
      'process': '流程',
      'repayment': '还款',
      'operation': '操作',
      'appearance': '外观',
      'quality': '质量',
      'total_score': '总分'
    },
    '中文名': '先锋用户调研数据'
  },
  'tmp_0408_migu_dialing': {
    '表名': 'tmp_0408_migu_dialing',
    '关联关系': '[]',
    '所需字段': {
      'Business_name': '业务名称',
      'Indicator_Name': '指标名称',
      'Version': '版本号',
      'Equipmen_type': '设备类型',
      'Network_type': '网络类型',
      'tset_value': '测试值',
      'testing_unit': '测试单位',
      'result': '结果',
      'dBm': '信号(dBm)',
      'city_name': '所在地',
      'end_time': '测试结束时间',
      'validity': '数据有效性',
      'product_no': '手机号码'
    },
    '样例数据': [
      {
        'Business_name': '腾讯视频',
        'Indicator_Name': '腾讯视频视频在线播放CPU占用峰值',
        'Version': 'V8.8.95.27508',
        'Equipmen_type': 'VIVO_X9-Plus',
        'Network_type': '4G',
        'tset_value': '15.0',
        'testing_unit': '%',
        'result': '成功',
        'dBm': '0',
        'city_name': '福建厦门',
        'end_time': '2023-08-01 00:00:20',
        'validity': '有效',
        'product_no': '15959205441'
      },
      {
        'Business_name': '腾讯视频',
        'Indicator_Name': '腾讯视频视频在线播放时内存占用峰值',
        'Version': 'V8.8.95.27508',
        'Equipmen_type': 'VIVO_X9-Plus',
        'Network_type': '4G',
        'tset_value': '644.07',
        'testing_unit': 'MB',
        'result': '成功',
        'dBm': '0',
        'city_name': '福建厦门',
        'end_time': '2023-08-01 00:00:20',
        'validity': '有效',
        'product_no': '15959205441'
      },
      {
        'Business_name': '天翼超高清',
        'Indicator_Name': '天翼超高清视频在线播放花屏时长占比',
        'Version': 'V5.5.18.16',
        'Equipmen_type': 'OPPO_A5',
        'Network_type': 'WIFI',
        'tset_value': '11.04',
        'testing_unit': '%',
        'result': '成功',
        'dBm': '-44',
        'city_name': '上海',
        'end_time': '2023-08-01 00:00:37',
        'validity': '有效',
        'product_no': '15000735814'
      },
      {
        'Business_name': '腾讯视频',
        'Indicator_Name': '腾讯视频视频下载的平均速率',
        'Version': 'V8.8.95.27508',
        'Equipmen_type': 'VIVO_X9-Plus',
        'Network_type': '4G',
        'tset_value': '4739.44',
        'testing_unit': 'KB/s',
        'result': '成功',
        'dBm': '0',
        'city_name': '福建厦门',
        'end_time': '2023-08-01 00:00:39',
        'validity': '有效',
        'product_no': '15959205441'
      },
      {
        'Business_name': '天翼超高清',
        'Indicator_Name': '天翼超高清视频搜索结果列表页加载时延',
        'Version': 'V5.5.27.13',
        'Equipmen_type': 'VIVO_S15',
        'Network_type': 'WIFI',
        'tset_value': '0.73',
        'testing_unit': 's',
        'result': '成功',
        'dBm': '-83',
        'city_name': '陕西西安',
        'end_time': '2023-08-01 00:02:32',
        'validity': '有效',
        'product_no': ''
      }
    ],
    '表的所有字段': {
      'Business_name': '业务名称',
      'Indicator_Name': '指标名称',
      'Version': '版本号',
      'Equipmen_type': '设备类型',
      'Network_type': '网络类型',
      'tset_value': '测试值',
      'testing_unit': '测试单位',
      'result': '结果',
      'dBm': '信号(dBm)',
      'city_name': '所在地',
      'end_time': '测试结束时间',
      'validity': '数据有效性',
      'product_no': '手机号码'
    },
    '中文名': '拨测数据'
  }
}

export const outline = {
  '业务概览': [
    '分析各城市家庭市场同比增收情况',
    '计算各城市家庭市场增幅贡献比例'
  ],
  '市场趋势': [
    '对比不同时间点的家庭市场增收趋势',
    '分析宽带渗透率变化与增收之间的关系'
  ],
  '市场细分': [
    '识别增收最高的地市',
    '分析宽带渗透率最低的地市及其原因'
  ],
  '竞争分析': [
    '评估各城市市场增长速度与行业平均的对比',
    '分析各城市市场增长的驱动因素'
  ],
  '策略建议': [
    '基于数据分析提出提升宽带渗透率的策略',
    '建议针对低渗透率城市的具体运营策略'
  ],
  '数据完整性与准确性检查': [
    '验证数据日期与报告周期的一致性',
    '检查数据列的完整性，确保无缺失值'
  ]
}

export const outline2 = {
  '家庭业务': {
    '宽带': {
      '家庭宽带': {
        '发展': {
          '受理': [
            {
              '表名': 'dw_mobilewire_user_statu_ds',
              '中文名': '有线宽带统一用户视图表'
            }
          ],
          '新增': [
            {
              '表名': 'dw_product_dt',
              '中文名': '用户资料表'
            },
            {
              '表名': 'dw_mobilewire_user_statu_ds',
              '中文名': '有线宽带统一用户视图表'
            }
          ]
        },
        '净增': [
          {
            '表名': 'dw_mobilewire_user_statu_ds',
            '中文名': '有线宽带统一用户视图表'
          },
          {
            '表名': 'dw_mobilewire_user_statu_ds',
            '中文名': '有线宽带统一用户视图表'
          }
        ],
        '到达': [
          {
            '表名': 'dw_mobilewire_user_statu_ds',
            '中文名': '有线宽带统一用户视图表'
          }
        ],
        '流失（离网）': [
          {
            '表名': 'dw_mobilewire_user_statu_ds',
            '中文名': '有线宽带统一用户视图表'
          },
          {
            '表名': 'dw_mobilewire_user_statu_ds',
            '中文名': '有线宽带统一用户视图表'
          }
        ]
      }
    },
    '企业宽带': {},
    '校园宽带': {},
    '千兆宽带': {},
    '群组宽带': {},
    '第二条宽带': {}
  },
  '移动高清(机顶盒)': {
    '家宽移动高清': {
      '净增': {},
      '发展': {
        '受理': {},
        '新增': {}
      },
      '到达': {},
      '流失（离网）': {}
    },
    '企宽移动高清': {},
    '大屏点播': {
      '屏上(大屏)': {},
      '屏下(小屏)': {},
      '付费': {},
      '免费': {}
    },
    '质差机顶盒': {}
  }
}

export const outline3 = {
  'id': 'root',
  'topic': '全业务',
  'children': [
    {
      'id': 'easy',
      'topic': 'Easy',
      'direction': 'left',
      'expanded': false,
      'children': [
        {
          'id': 'easy1',
          'topic': 'Easy to show',
          children: [
            {
              'id': 'easy11',
              'topic': 'xxx表 dw_city_operation_indicator',
              'table_ename': 'dw_city_operation_indicator',
              'table_cname': '城市运营指标表'
            }
          ]
        },
        {
          'id': 'easy2',
          'topic': 'Easy to edit'
        },
        {
          'id': 'easy3',
          'topic': 'Easy to store'
        },
        {
          'id': 'easy4',
          'topic': 'Easy to embed',
          expanded: false,
          'children': [
            {
              'id': 'easy40',
              'topic': 'Easy to show1'
            },
            {
              'id': 'easy45',
              'topic': 'Easy to edit1'
            },
            {
              'id': 'easy43',
              'topic': 'Easy to store1'
            },
            {
              'id': 'open44',
              'topic': 'BSD License',
              'children': [
                {
                  'id': 'open441',
                  'topic': 'on GitHub'
                },
                {
                  'id': 'open442',
                  'topic': 'BSD License111'
                }
              ]
            },
            {
              'id': 'easy45',
              'topic': 'Easy to embed'
            }
          ]
        }
      ]
    },
    {
      'id': 'open',
      'topic': 'Open Source',
      'direction': 'right',
      'children': [
        {
          'id': 'open1',
          'topic': 'on GitHub'
        },
        {
          'id': 'open2',
          'topic': 'BSD License',
          'children': [
            {
              'id': 'open21',
              'topic': 'on GitHub'
            },
            {
              'id': 'open22',
              'topic': 'BSD License',
              expanded: false,
              'children': [
                {
                  'id': 'open221',
                  'topic': 'on GitHub',
                  'children': [
                    {
                      'id': 'open2211',
                      'topic': 'band new world, band new day',
                      children: [
                        {
                          'id': 'open22111',
                          'topic': 'xxx表 dw_city_operation_indicator_bak',
                          'table_ename': 'dw_city_operation_indicator_bak',
                          'table_cname': '城市运营指标表备份'
                        }
                      ]
                    }
                  ]
                },
                {
                  'id': 'open222',
                  'topic': 'BSD License-222',
                  'children': [
                    {
                      'id': 'open2221',
                      'topic': 'xxx表 dim_pub_city',
                      'table_ename': 'dim_pub_city',
                      'table_cname': '城市维表'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      'id': 'powerful',
      'topic': 'Powerful',
      'direction': 'right',
      'expanded': false,
      'children': [
        {
          'id': 'powerful1',
          'topic': 'Base on Javascript'
        },
        {
          'id': 'powerful2',
          'topic': 'Base on HTML5'
        },
        {
          'id': 'powerful3',
          'topic': 'Depends on you',
          'expanded': false,
          'children': [
            {
              'id': 'powerful31',
              'topic': 'Base on Javascript',
              children: [
                {
                  'id': 'powerful311',
                  'topic': 'xxx表 dw_mobilewire_user_statu_ds',
                  'table_ename': 'dw_mobilewire_user_statu_ds',
                  'table_cname': '有线宽带统一用户视图表'
                }
              ]
            },
            {
              'id': 'powerful32',
              'topic': 'Base on HTML5',
              'table': 'st_xfdfds_sdfdsf'
            },
            {
              'id': 'powerful33',
              'topic': 'Depends on you'
            }
          ]
        }
      ]
    },
    {
      'id': 'other',
      'topic': 'test node',
      'direction': 'left',
      'children': [
        {
          'id': 'other1',
          'topic': "I'm from 咪咕点播表",
          'table_ename': 'tmp_0408_migu_dialing',
          'table_cname': '咪咕点播表'
        },
        {
          'id': 'other2',
          'topic': 'I can do everything'
        }
      ]
    }
  ]
}

export const outline4 = {
  'id': 'root',
  'topic': '咪咕视频产品质量分析',
  'children': [
    {
      'id': 'tmp_0408_migu_pioneer_research',
      'topic': '先锋用户调研数据',
      'expanded': false,
      'table_cname': '先锋用户调研数据',
      'table_ename': 'tmp_0408_migu_pioneer_research'
    },
    {
      'id': 'tmp_0408_migu_import_KEI',
      'topic': '重点KEI数据',
      'expanded': false,
      'table_cname': '重点KEI数据',
      'table_ename': 'tmp_0408_migu_import_KEI'
    },
    {
      'id': 'tmp_0408_migu_export_KEI',
      'topic': '非重点KEI数据',
      'expanded': false,
      'table_cname': '非重点KEI数据',
      'table_ename': 'tmp_0408_migu_export_KEI'
    },
    {
      'id': 'tmp_0408_migu_satis_value',
      'topic': '用户满意度数据',
      'expanded': false,
      'table_cname': '用户满意度数据',
      'table_ename': 'tmp_0408_migu_satis_value'
    },
    {
      'id': 'tmp_0408_migu_score_all',
      'topic': '产品质量指标总分',
      'expanded': false,
      'table_cname': '产品质量指标总分',
      'table_ename': 'tmp_0408_migu_score_all'
    },
    {
      'id': 'tmp_0408_migu_tousu',
      'topic': '咪咕视频投诉数据',
      'expanded': false,
      'table_cname': '咪咕视频投诉数据',
      'table_ename': 'tmp_0408_migu_tousu'
    },
    {
      'id': 'tmp_0408_migu_tousu_reci',
      'topic': '咪咕视频投诉热词数',
      'expanded': false,
      'table_cname': '咪咕视频投诉热词数',
      'table_ename': 'tmp_0408_migu_tousu_reci'
    },
    {
      'id': 'tmp_0408_migu_dialing',
      'topic': '拨测数据',
      'expanded': false,
      'table_cname': '拨测数据',
      'table_ename': 'tmp_0408_migu_dialing'
    },
    {
      'id': 'tmp_0408_migu_ceping_problem',
      'topic': '测评问题',
      'expanded': false,
      'table_cname': '测评问题',
      'table_ename': 'tmp_0408_migu_ceping_problem'
    },
    {
      'id': 'tmp_0408_migu_product_demand',
      'topic': '一二类产品需求',
      'expanded': false,
      'table_cname': '一二类产品需求',
      'table_ename': 'tmp_0408_migu_product_demand'
    },
    {
      'id': 'tmp_0408_migu_operational_needs',
      'topic': '两级运营需求',
      'expanded': false,
      'table_cname': '两级运营需求',
      'table_ename': 'tmp_0408_migu_operational_needs'
    },
    {
      'id': 'tmp_0408_migu_product_version',
      'topic': '产品版本管理',
      'expanded': false,
      'table_cname': '产品版本管理',
      'table_ename': 'tmp_0408_migu_product_version'
    },
    {
      'id': 'tmp_0408_migu_pioneer_question',
      'topic': '先锋用户体验测评问题',
      'expanded': false,
      'table_cname': '先锋用户体验测评问题',
      'table_ename': 'tmp_0408_migu_pioneer_question'
    }
  ]
}

export const historyTree = [
  {
    id: 100,
    label: '一级 历史条目-1',
    children: [
      {
        id: 101,
        label: '二级 历史条目-1-1',
        children: [
          {
            id: 102,
            label: '三级 历史条目-1-1-1'
          },
          {
            id: 103,
            label: '三级 历史条目--1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 104,
    label: '一级 历史条目-2',
    children: [
      {
        id: 105,
        label: '二级 历史条目-2-1',
        children: [
          {
            id: 106,
            label: '三级 历史条目2-1-1'
          },
          {
            id: 107,
            label: '三级 历史条目2-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 200,
    label: '一级 历史条目-3',
    children: [
      {
        id: 201,
        label: '二级 历史条目-3-1'
      },
      {
        id: 202,
        label: '二级 历史条目-3-2'
      }
    ]
  }
]

export const timelineData = [
  {
    content: 'Custom icon',
    timestamp: '2018-04-12 20:46',
    type: ''
  },
  {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    // hollow: true,
    type: '',
    children: [
      {
        content: 'child',
        timestamp: '2018-04-03 20:46'
      },
      {
        content: 'Custom hollow',
        timestamp: '2018-04-03 20:46'
      }
    ]
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    children: [
      {
        content: 'child',
        timestamp: '2018-04-03 20:46'
      },
      {
        content: 'Custom hollow',
        timestamp: '2018-04-03 20:46',
        children: [
          {
            content: 'child',
            timestamp: '2018-04-03 20:46'
          },
          {
            content: 'Custom hollow',
            timestamp: '2018-04-03 20:46'
          }
        ]
      }
    ]
  },
  {
    content: 'Custom hollow',
    timestamp: '2018-04-03 20:46'
  },
  {
    content: 'Default node',
    timestamp: '2018-04-03 20:46',
    children: [
      {
        content: 'child',
        timestamp: '2018-04-03 20:46'
      },
      {
        content: 'Custom hollow',
        timestamp: '2018-04-03 20:46'
      }
    ]
  }
]

export const rewriteOutline = {
  '问题': '查询2024年济南公司的增量市场增幅贡献pp、家庭市场增幅贡献pp、存量市场增幅贡献pp，输出三个字段，包括：增量市场增幅贡献pp、家庭市场增幅贡献pp、存量市场增幅贡献pp。',
  '绘图要求': {
    '是否对比分析': [
      '否'
    ],
    '横轴': [
      '地市名称'
    ],
    '纵轴': [
      '增量市场增幅贡献pp',
      '家庭市场增幅贡献pp',
      '存量市场增幅贡献pp'
    ],
    '统计图类型': '柱状图'
  }
}

export const drawData = {
  'draw_data': {
    'plot': 'bar',
    'x': {
      'x_axis': [
        0, 1
      ]
    },
    'y': {
      '增量市场增幅贡献pp': [
        '0.2751', '0.2569'
      ],
      '家庭市场增幅贡献pp': [
        '1.8381', '0.5478'
      ],
      '存量市场增幅贡献pp': [
        '1.9979', '0.6971'
      ]
    }
  },
  'draw_data_2': {
    'plot': 'line',
    'x': {
      'x_axis': [
        '济南',
        '青岛',
        '潍坊',
        '临沂',
        '淄博',
        '烟台',
        '济宁',
        '泰安',
        '德州',
        '滨州',
        '聊城',
        '菏泽',
        '日照',
        '莱芜'
      ],
      'name': '城市'
    },
    'y': {
      '宽带渗透率': [
        '0.2913',
        '0.2798',
        '0.2571',
        '0.2938',
        '0.2812',
        '0.2757',
        '0.278',
        '0.2865',
        '0.2792',
        '0.2885',
        '0.2817',
        '0.2753',
        '0.279',
        '0.2821'
      ]
    }
  },
  'draw_data_3': {
    'x': {
      'x_axis': [
        '2023-08',
        '2023-09',
        '2023-10',
        '2023-11',
        '2023-12'
      ],
      'name': '时间'
    },
    'y': {
      '重点KEI指标测评总分': [
        92.06800000000001,
        92.65599999999999,
        92.118,
        93.86000000000001,
        92.526
      ],
      '非重点KEI指标测评总分': [
        88.72999999999999,
        87.80199999999999,
        88.56,
        88.6,
        88.3
      ]
    },
    'plot': 'line'
  },
  '耗时': 15.631957292556763,
  'sql': "SELECT `IMGC_pp` AS '增量市场增幅贡献pp', `HMGC_pp` AS '家庭市场增幅贡献pp', `EMGC_pp` AS '存量市场增幅贡献pp' FROM dw_city_operation_indicator WHERE `op_time` LIKE '2024%' AND `city_name` = '济南'"
}

export const desciption = '分析报告：\n\n- 增量市场增幅贡献pp：0.2751\n- 家庭市场增幅贡献pp：1.8381\n- 存量市场增幅贡献pp：1.9979\n\n结论：在2024年，济南公司的家庭市场和存量市场的增长贡献显著高于增量市场。家庭市场增幅贡献pp为1.8381，存量市场增幅贡献pp为1.9979，均远高于增量市场的0.2751。这表明，济南公司应继续关注和加强家庭市场和存量市场的开发和维护，以保持和提升市场增长。同时，也应考虑增量市场的策略，以提高其增长贡献。'

export const historyTree1 = {
  '收入总体情况分析':
      [
        '分析济南公司第二季度CHN同比增收（万元）的趋势和波动，评估综合收入的整体表现。',
        '分析济南公司第二季度CHN收入增幅pp。'
      ],
  '分市场收入情况分析':
      [
        '比较济南公司综合收入的不同市场（增量市场、家庭市场、存量市场）的同比增收情况，识别收入增长的主要来源。',
        '评估济南公司综合收入的各市场增幅贡献pp（增量市场、家庭市场、存量市场），确定各市场对总收入增长的贡献度。'
      ],
  '分路径收入情况':
      [
        '分析济南公司综合收入的分路径收入（升档、流量包、快消包、接盘、独立权益、新业务、平档、降档、离网）的增幅贡献pp，了解各路径对收入的具体影响。识别收入主路径'
      ],
  '收入预测与策略建议':
      [
        '基于历史数据和当前趋势预测济南公司第三季度收入。',
        '提出针对济南公司收入增长的策略建议。'
      ]
}

export const historyTree2 =
{
  '收入概览分析': ['总收入趋势分析',
    '各业务线收入占比分析',
    '分析济南公司第二季度CHN同比增收的趋势和波动，评估综合收入的整体表现。'
  ],
  '收入增长分析': ['同比收入增长分析',
    '环比收入增长分析',
    '关键业务线收入增长驱动因素分析'
  ],
  '市场竞争分析': ['市场份额变化分析',
    '比较济南公司综合收入的不同市场（增量市场、家庭市场、存量市场）的同比增收情况，识别收入增长的主要来源。',
    '评估济南公司综合收入的各市场增幅贡献pp（增量市场、家庭市场、存量市场），确定各市场对总收入增长的贡献度。',
    '分析济南公司综合收入的分路径收入（升档、流量包、快消包、接盘、独立权益、新业务、平档、降档、离网）的增幅贡献pp，了解各路径对收入的具体影响。'
  ]
}
