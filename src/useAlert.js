import React, { useEffect, useState, useCallback } from 'react';
import { render } from 'react-dom';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

/**
 * Class
 * @description 提示框状态常量
 */
class AlertStatus {
  // 成功
  static get SUCCESS() {
    return 'success';
  }

  // 错误
  static get ERROR() {
    return 'error';
  }

  // 警告
  static get WARNING() {
    return 'warning';
  }

  // 提示
  static get INFO() {
    return 'info';
  }
}

/**
 * @description Alert组件
 *  状态 'success' 'error' 'info' 'warning'
 */
const useAlert = () => {
  const [message, setMessage] = useState(null); // 控制信息展示
  const [status, setStatus] = useState(null); // 控制展示状态
  const [visible, setVisible] = useState(false); // 控制显示隐藏

  /**
   * Callback
   * @description 显示Alert
   */
  const onOpen = useCallback((params) => {
    setVisible(true);
    setStatus(params?.icon);
    setMessage(params?.message);
  }, []);

  /**
   * Callback
   * @description 关闭Alert
   */
  const onClose = useCallback(() => setVisible(false), []);

  const Alert = () => (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={visible}
      onClose={onClose}
    >
      <MuiAlert severity={status} elevation={6} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );

  /**
   * Effect
   * @description 监听信息 展示
   */
  useEffect(() => {
    // 如果存在信息
    if (!message) return false;
    // 创建dom元素
    const element = document.createElement('div');
    // 追加body
    document.body.appendChild(element);
    render(<Alert />, element);

    // 计时器延时2s移除dom元素
    const timer = setTimeout(() => {
      document.body.removeChild(element);
    }, 2000);

    return () => {
      // 卸载时删除自身 清空计时器
      element.remove();
      clearTimeout(timer);
    };
  }, [message, visible]);

  return [onOpen];
};

export { useAlert, AlertStatus };
