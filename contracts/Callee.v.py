bytesStore: map(bytes32, bytes32)

owner: public(address)
writer: public(address)

@public
def __init__():
    self.owner = msg.sender

@public
def setWriter(_writer: address):
    assert self.owner == msg.sender
    self.writer = _writer

@public
def getBytes(key: bytes32) -> bytes32:
    assert msg.sender == self.writer
    return self.bytesStore[key]

@public
def setBytes(key: bytes32, value: bytes32):
    assert msg.sender == self.writer
    self.bytesStore[key] = value
