cmd_Release/obj.target/tree_sitter_runtime_binding/src/node.o := g++ -o Release/obj.target/tree_sitter_runtime_binding/src/node.o ../src/node.cc '-DNODE_GYP_MODULE_NAME=tree_sitter_runtime_binding' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_GLIBCXX_USE_CXX11_ABI=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-D__STDC_FORMAT_MACROS' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DBUILDING_NODE_EXTENSION' -I/home/anton/.cache/node-gyp/16.15.1/include/node -I/home/anton/.cache/node-gyp/16.15.1/src -I/home/anton/.cache/node-gyp/16.15.1/deps/openssl/config -I/home/anton/.cache/node-gyp/16.15.1/deps/openssl/openssl/include -I/home/anton/.cache/node-gyp/16.15.1/deps/uv/include -I/home/anton/.cache/node-gyp/16.15.1/deps/zlib -I/home/anton/.cache/node-gyp/16.15.1/deps/v8/include -I../vendor/tree-sitter/lib/include -I../vendor/superstring -I../../nan  -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -m64 -std=c++17 -O3 -fno-omit-frame-pointer -fno-rtti -fno-exceptions -std=gnu++14 -MMD -MF ./Release/.deps/Release/obj.target/tree_sitter_runtime_binding/src/node.o.d.raw   -c
Release/obj.target/tree_sitter_runtime_binding/src/node.o: ../src/node.cc \
 ../src/./node.h ../../nan/nan.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/node_version.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/uv.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/uv/errno.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/uv/version.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/uv/unix.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/uv/threadpool.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/uv/linux.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/node.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/v8.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/cppgc/common.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/v8config.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/v8-internal.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/v8-version.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/v8config.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/v8-platform.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/node_version.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/node_buffer.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/node.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/node_object_wrap.h \
 ../../nan/nan_callbacks.h ../../nan/nan_callbacks_12_inl.h \
 ../../nan/nan_maybe_43_inl.h ../../nan/nan_converters.h \
 ../../nan/nan_converters_43_inl.h ../../nan/nan_new.h \
 ../../nan/nan_implementation_12_inl.h ../../nan/nan_persistent_12_inl.h \
 ../../nan/nan_weak.h ../../nan/nan_object_wrap.h ../../nan/nan_private.h \
 ../../nan/nan_typedarray_contents.h ../../nan/nan_json.h \
 ../../nan/nan_scriptorigin.h \
 /home/anton/.cache/node-gyp/16.15.1/include/node/v8.h \
 ../vendor/tree-sitter/lib/include/tree_sitter/api.h ../src/././tree.h \
 ../src/./util.h ../src/./conversions.h ../src/./tree.h \
 ../src/./tree_cursor.h
../src/node.cc:
../src/./node.h:
../../nan/nan.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/node_version.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/uv.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/uv/errno.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/uv/version.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/uv/unix.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/uv/threadpool.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/uv/linux.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/node.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/v8.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/cppgc/common.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/v8config.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/v8-internal.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/v8-version.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/v8config.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/v8-platform.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/node_version.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/node_buffer.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/node.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/node_object_wrap.h:
../../nan/nan_callbacks.h:
../../nan/nan_callbacks_12_inl.h:
../../nan/nan_maybe_43_inl.h:
../../nan/nan_converters.h:
../../nan/nan_converters_43_inl.h:
../../nan/nan_new.h:
../../nan/nan_implementation_12_inl.h:
../../nan/nan_persistent_12_inl.h:
../../nan/nan_weak.h:
../../nan/nan_object_wrap.h:
../../nan/nan_private.h:
../../nan/nan_typedarray_contents.h:
../../nan/nan_json.h:
../../nan/nan_scriptorigin.h:
/home/anton/.cache/node-gyp/16.15.1/include/node/v8.h:
../vendor/tree-sitter/lib/include/tree_sitter/api.h:
../src/././tree.h:
../src/./util.h:
../src/./conversions.h:
../src/./tree.h:
../src/./tree_cursor.h: