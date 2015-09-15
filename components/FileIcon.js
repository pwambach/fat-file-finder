import React, { PropTypes, Component } from 'react';
import PureComponent from 'react-pure-render/component';
import fileIconMap from '../constants/FileIconMapping';

class FileIcon extends PureComponent {



  render() {
    const { type } = this.props;
    const iconClassName = 'fa '.concat(fileIconMap[type] || 'fa-file-o');

    return (
      <div>
        <i className={iconClassName}></i>
      </div>
    );
  }

}

FileIcon.propTypes = {
  type: PropTypes.string.isRequired
};


export default FileIcon;
