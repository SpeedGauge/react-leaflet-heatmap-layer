"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash.map"));

var _lodash2 = _interopRequireDefault(require("lodash.reduce"));

var _lodash3 = _interopRequireDefault(require("lodash.filter"));

var _lodash4 = _interopRequireDefault(require("lodash.min"));

var _lodash5 = _interopRequireDefault(require("lodash.max"));

var _lodash6 = _interopRequireDefault(require("lodash.isnumber"));

var _leaflet = _interopRequireDefault(require("leaflet"));

var _reactLeaflet = require("react-leaflet");

var _simpleheat = _interopRequireDefault(require("simpleheat"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isInvalid(num) {
  return !(0, _lodash6["default"])(num) && !num;
}

function isValid(num) {
  return !isInvalid(num);
}

function isValidLatLngArray(arr) {
  return (0, _lodash3["default"])(arr, isValid).length === arr.length;
}

function isInvalidLatLngArray(arr) {
  return !isValidLatLngArray(arr);
}

function safeRemoveLayer(leafletMap, el) {
  var _leafletMap$getPanes = leafletMap.getPanes(),
      overlayPane = _leafletMap$getPanes.overlayPane;

  if (overlayPane && overlayPane.contains(el)) {
    overlayPane.removeChild(el);
  }
}

function shouldIgnoreLocation(loc) {
  return isInvalid(loc.lng) || isInvalid(loc.lat);
}

var _default = (0, _reactLeaflet.withLeaflet)((_temp = _class = /*#__PURE__*/function (_MapLayer) {
  _inherits(HeatmapLayer, _MapLayer);

  var _super = _createSuper(HeatmapLayer);

  function HeatmapLayer() {
    _classCallCheck(this, HeatmapLayer);

    return _super.apply(this, arguments);
  }

  _createClass(HeatmapLayer, [{
    key: "createLeafletElement",
    value: function createLeafletElement() {
      return null;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      var canAnimate = this.props.leaflet.map.options.zoomAnimation && _leaflet["default"].Browser.any3d;
      var zoomClass = "leaflet-zoom-".concat(canAnimate ? 'animated' : 'hide');
      var mapSize = this.props.leaflet.map.getSize();

      var transformProp = _leaflet["default"].DomUtil.testProp(['transformOrigin', 'WebkitTransformOrigin', 'msTransformOrigin']);

      this._el = _leaflet["default"].DomUtil.create('canvas', zoomClass);
      this._el.style[transformProp] = '50% 50%';
      this._el.width = mapSize.x;
      this._el.height = mapSize.y;
      var el = this._el;

      var Heatmap = _leaflet["default"].Layer.extend({
        onAdd: function onAdd(leafletMap) {
          return leafletMap.getPanes().overlayPane.appendChild(el);
        },
        addTo: function addTo(leafletMap) {
          leafletMap.addLayer(_this);
          return _this;
        },
        onRemove: function onRemove(leafletMap) {
          return safeRemoveLayer(leafletMap, el);
        }
      });

      this.leafletElement = new Heatmap();

      _get(_getPrototypeOf(HeatmapLayer.prototype), "componentDidMount", this).call(this);

      this._heatmap = (0, _simpleheat["default"])(this._el);
      this.reset();

      if (this.props.fitBoundsOnLoad) {
        this.fitBounds();
      }

      this.attachEvents();
      this.updateHeatmapProps(this.getHeatmapProps(this.props));
    }
  }, {
    key: "getMax",
    value: function getMax(props) {
      return props.max || 3.0;
    }
  }, {
    key: "getRadius",
    value: function getRadius(props) {
      return props.radius || 30;
    }
  }, {
    key: "getMaxZoom",
    value: function getMaxZoom(props) {
      return props.maxZoom || 18;
    }
  }, {
    key: "getMinOpacity",
    value: function getMinOpacity(props) {
      return props.minOpacity || 0.01;
    }
  }, {
    key: "getBlur",
    value: function getBlur(props) {
      return props.blur || 15;
    }
  }, {
    key: "getHeatmapProps",
    value: function getHeatmapProps(props) {
      return {
        minOpacity: this.getMinOpacity(props),
        maxZoom: this.getMaxZoom(props),
        radius: this.getRadius(props),
        blur: this.getBlur(props),
        max: this.getMax(props),
        gradient: props.gradient
      };
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var currentProps = this.props;
      var nextHeatmapProps = this.getHeatmapProps(nextProps);
      this.updateHeatmapGradient(nextHeatmapProps.gradient);
      var hasRadiusUpdated = nextHeatmapProps.radius !== currentProps.radius;
      var hasBlurUpdated = nextHeatmapProps.blur !== currentProps.blur;

      if (hasRadiusUpdated || hasBlurUpdated) {
        this.updateHeatmapRadius(nextHeatmapProps.radius, nextHeatmapProps.blur);
      }

      if (nextHeatmapProps.max !== currentProps.max) {
        this.updateHeatmapMax(nextHeatmapProps.max);
      }
    }
    /**
     * Update various heatmap properties like radius, gradient, and max
     */

  }, {
    key: "updateHeatmapProps",
    value: function updateHeatmapProps(props) {
      this.updateHeatmapRadius(props.radius, props.blur);
      this.updateHeatmapGradient(props.gradient);
      this.updateHeatmapMax(props.max);
    }
    /**
     * Update the heatmap's radius and blur (blur is optional)
     */

  }, {
    key: "updateHeatmapRadius",
    value: function updateHeatmapRadius(radius, blur) {
      if (radius) {
        this._heatmap.radius(radius, blur);
      }
    }
    /**
     * Update the heatmap's gradient
     */

  }, {
    key: "updateHeatmapGradient",
    value: function updateHeatmapGradient(gradient) {
      if (gradient) {
        this._heatmap.gradient(gradient);
      }
    }
    /**
     * Update the heatmap's maximum
     */

  }, {
    key: "updateHeatmapMax",
    value: function updateHeatmapMax(maximum) {
      if (maximum) {
        this._heatmap.max(maximum);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      safeRemoveLayer(this.props.leaflet.map, this._el);
    }
  }, {
    key: "fitBounds",
    value: function fitBounds() {
      var points = this.props.points;
      var lngs = (0, _lodash["default"])(points, this.props.longitudeExtractor);
      var lats = (0, _lodash["default"])(points, this.props.latitudeExtractor);
      var ne = {
        lng: (0, _lodash5["default"])(lngs),
        lat: (0, _lodash5["default"])(lats)
      };
      var sw = {
        lng: (0, _lodash4["default"])(lngs),
        lat: (0, _lodash4["default"])(lats)
      };

      if (shouldIgnoreLocation(ne) || shouldIgnoreLocation(sw)) {
        return;
      }

      this.props.leaflet.map.fitBounds(_leaflet["default"].latLngBounds(_leaflet["default"].latLng(sw), _leaflet["default"].latLng(ne)));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.props.leaflet.map.invalidateSize();

      if (this.props.fitBoundsOnUpdate) {
        this.fitBounds();
      }

      this.reset();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      return true;
    }
  }, {
    key: "attachEvents",
    value: function attachEvents() {
      var _this2 = this;

      var leafletMap = this.props.leaflet.map;
      leafletMap.on('viewreset', function () {
        return _this2.reset();
      });
      leafletMap.on('moveend', function () {
        return _this2.reset();
      });

      if (leafletMap.options.zoomAnimation && _leaflet["default"].Browser.any3d) {
        leafletMap.on('zoomanim', this._animateZoom, this);
      }
    }
  }, {
    key: "_animateZoom",
    value: function _animateZoom(e) {
      var scale = this.props.leaflet.map.getZoomScale(e.zoom);

      var offset = this.props.leaflet.map._getCenterOffset(e.center)._multiplyBy(-scale).subtract(this.props.leaflet.map._getMapPanePos());

      if (_leaflet["default"].DomUtil.setTransform) {
        _leaflet["default"].DomUtil.setTransform(this._el, offset, scale);
      } else {
        this._el.style[_leaflet["default"].DomUtil.TRANSFORM] = "".concat(_leaflet["default"].DomUtil.getTranslateString(offset), " scale(").concat(scale, ")");
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      var topLeft = this.props.leaflet.map.containerPointToLayerPoint([0, 0]);

      _leaflet["default"].DomUtil.setPosition(this._el, topLeft);

      var size = this.props.leaflet.map.getSize();

      if (this._heatmap._width !== size.x) {
        this._el.width = this._heatmap._width = size.x;
      }

      if (this._heatmap._height !== size.y) {
        this._el.height = this._heatmap._height = size.y;
      }

      if (this._heatmap && !this._frame && !this.props.leaflet.map._animating) {
        this._frame = _leaflet["default"].Util.requestAnimFrame(this.redraw, this);
      }

      this.redraw();
    }
  }, {
    key: "redraw",
    value: function redraw() {
      var r = this._heatmap._r;
      var size = this.props.leaflet.map.getSize();
      var maxIntensity = this.props.max === undefined ? 1 : this.getMax(this.props);
      var maxZoom = this.props.maxZoom === undefined ? this.props.leaflet.map.getMaxZoom() : this.getMaxZoom(this.props);
      var v = 1 / Math.pow(2, Math.max(0, Math.min(maxZoom - this.props.leaflet.map.getZoom(), 12)) / 2);
      var cellSize = r / 2;

      var panePos = this.props.leaflet.map._getMapPanePos();

      var offsetX = panePos.x % cellSize;
      var offsetY = panePos.y % cellSize;
      var getLat = this.props.latitudeExtractor;
      var getLng = this.props.longitudeExtractor;
      var getIntensity = this.props.intensityExtractor;

      var inBounds = function inBounds(p, bounds) {
        return bounds.contains(p);
      };

      var filterUndefined = function filterUndefined(row) {
        return (0, _lodash3["default"])(row, function (c) {
          return c !== undefined;
        });
      };

      var roundResults = function roundResults(results) {
        return (0, _lodash2["default"])(results, function (result, row) {
          return (0, _lodash["default"])(filterUndefined(row), function (cell) {
            return [Math.round(cell[0]), Math.round(cell[1]), Math.min(cell[2], maxIntensity), cell[3]];
          }).concat(result);
        }, []);
      };

      var accumulateInGrid = function accumulateInGrid(points, leafletMap, bounds) {
        return (0, _lodash2["default"])(points, function (grid, point) {
          var latLng = [getLat(point), getLng(point)];

          if (isInvalidLatLngArray(latLng)) {
            //skip invalid points
            return grid;
          }

          var p = leafletMap.latLngToContainerPoint(latLng);

          if (!inBounds(p, bounds)) {
            return grid;
          }

          var x = Math.floor((p.x - offsetX) / cellSize) + 2;
          var y = Math.floor((p.y - offsetY) / cellSize) + 2;
          grid[y] = grid[y] || [];
          var cell = grid[y][x];
          var alt = getIntensity(point);
          var k = alt * v;

          if (!cell) {
            grid[y][x] = [p.x, p.y, k, 1];
          } else {
            cell[0] = (cell[0] * cell[2] + p.x * k) / (cell[2] + k); // x

            cell[1] = (cell[1] * cell[2] + p.y * k) / (cell[2] + k); // y

            cell[2] += k; // accumulated intensity value

            cell[3] += 1;
          }

          return grid;
        }, []);
      };

      var getBounds = function getBounds() {
        return new _leaflet["default"].Bounds(_leaflet["default"].point([-r, -r]), size.add([r, r]));
      };

      var getDataForHeatmap = function getDataForHeatmap(points, leafletMap) {
        return roundResults(accumulateInGrid(points, leafletMap, getBounds(leafletMap)));
      };

      var data = getDataForHeatmap(this.props.points, this.props.leaflet.map);

      this._heatmap.clear();

      this._heatmap.data(data).draw(this.getMinOpacity(this.props));

      this._frame = null;

      if (this.props.onStatsUpdate && this.props.points && this.props.points.length > 0) {
        this.props.onStatsUpdate((0, _lodash2["default"])(data, function (stats, point) {
          stats.max = point[3] > stats.max ? point[3] : stats.max;
          stats.min = point[3] < stats.min ? point[3] : stats.min;
          return stats;
        }, {
          min: Infinity,
          max: -Infinity
        }));
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return HeatmapLayer;
}(_reactLeaflet.MapLayer), _defineProperty(_class, "propTypes", {
  points: _propTypes["default"].array.isRequired,
  longitudeExtractor: _propTypes["default"].func.isRequired,
  latitudeExtractor: _propTypes["default"].func.isRequired,
  intensityExtractor: _propTypes["default"].func.isRequired,
  fitBoundsOnLoad: _propTypes["default"].bool,
  fitBoundsOnUpdate: _propTypes["default"].bool,
  onStatsUpdate: _propTypes["default"].func,

  /* props controlling heatmap generation */
  max: _propTypes["default"].number,
  radius: _propTypes["default"].number,
  maxZoom: _propTypes["default"].number,
  minOpacity: _propTypes["default"].number,
  blur: _propTypes["default"].number,
  gradient: _propTypes["default"].object
}), _temp));

exports["default"] = _default;
